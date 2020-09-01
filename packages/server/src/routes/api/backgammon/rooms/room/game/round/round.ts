import {
    EmitBrokenPointRound,
    EmitRound,
    OPPONENT,
    PLAYERS,
    Round as R,
    EmitCollectPointRound,
} from '@shared-types/backgammon';
import asyncParser from '@shared/asyncParser';
import { customPromise, customPromiseFindIndex } from '@shared/customPromise';
import { InvalidTriangleError } from '@shared/error';
import {
    deleteUsedDice,
    filterValidDice,
    filterValidTriangleIndexes,
    generateAsyncObj,
    handleTriangleLayout,
    rollDice,
    validateTargetTriangle,
    calculateShouldCollect,
    transformCollectAreaIndex,
    filterValidDiceIndex,
    filterFarthestTriangle,
    filterMaxDice,
    calculateCollectArea,
    calculateUsedDices,
} from './utils';

type CalculateMovableParams = Parameters<typeof calculateUsedDices>[0];

const INDEX_MAP = {
    [PLAYERS.BLACK]: (index: number) => index,
    [PLAYERS.WHITE]: (index: number) => 23 - index,
};

export default class Round implements R {
    id: R['id'];
    dice: R['dice'];

    constructor(
        public attempt: R['attempt'],
        public turn: R['turn'],
        public player: R['player'],
        public brokens: R['brokens'],
        public collected: R['collected'],
        public layout: R['layout'],
        dice?: R['dice']
    ) {
        this.id = Date.now();
        this.dice = dice || this.rollDices();
    }

    rollDices() {
        const dices = [rollDice(), rollDice()];
        const shouldDuplicate = dices[0] === dices[1];

        return shouldDuplicate ? dices.concat(dices) : dices;
    }

    async calculate(data: EmitRound) {
        const { fromTriangleIndex, color, toTriangleIndex } = data;

        const player = PLAYERS[color];
        const validDice = await filterValidDice(
            fromTriangleIndex,
            player,
            this.dice,
            this.layout.length
        );

        await this.validateTarget(data, validDice, player);

        const targetTriangle = this.layout[toTriangleIndex];
        const [owner, points] = targetTriangle;
        const shouldCapture = owner !== player;
        const brokens = await this.handleBrokens(shouldCapture, owner, player);
        const layout = await this.handleLayout(
            fromTriangleIndex,
            toTriangleIndex,
            player,
            shouldCapture,
            points
        );
        const dice = await this.handleDice(
            toTriangleIndex,
            fromTriangleIndex,
            validDice
        );

        return generateAsyncObj(brokens, dice, layout);
    }

    async calculateBrokenPoint(data: EmitBrokenPointRound) {
        const { color, toTriangleIndex } = data;
        const { dice: dices, player } = this;

        const triangle = this.layout[toTriangleIndex];
        const [owner, points] = triangle;
        const shouldCapture = owner !== player;

        // Increase opponent broken points
        const brokens = await this.handleBrokens(shouldCapture, owner, player);

        // Decrese round player's broken points.
        brokens[player] -= 1;

        // Paint placed point's triangle
        const layout = await asyncParser(this.layout);
        handleTriangleLayout(
            layout,
            toTriangleIndex,
            player,
            shouldCapture,
            points
        );

        // Convert triangle index into dice index.
        const dice = await customPromise(() =>
            color === 'BLACK'
                ? // Left bottom corner
                  layout.length - toTriangleIndex
                : // Left top corner
                  toTriangleIndex + 1
        );
        const usedDiceIndex = await customPromiseFindIndex(
            dices,
            (d) => d === dice
        );

        // Delete used dice
        const _dice = await this.deleteDice(usedDiceIndex);

        return generateAsyncObj(brokens, _dice, layout);
    }

    async calculateCollectPoint(data: EmitCollectPointRound) {
        const { fromTriangleIndex } = data;
        const { player, layout, dice: dices } = this;

        const shouldCollect = await calculateShouldCollect(player, layout);
        if (shouldCollect) {
            const triangleIndex = await transformCollectAreaIndex(
                player,
                fromTriangleIndex
            );

            const results = await Promise.all([
                filterValidDiceIndex(triangleIndex, dices),
                filterFarthestTriangle(layout, player),
                filterMaxDice(dices),
            ]);
            const [
                validDiceIndex,
                farthestTriangleIndex,
                maxDiceIndex,
            ] = results;

            const diceAndTriangleAreEqual = validDiceIndex > -1;
            const shouldPickable = await customPromise(() => {
                const isFarthestTriangle =
                    fromTriangleIndex === farthestTriangleIndex;
                const collectableByHigherDice =
                    dices[maxDiceIndex] > triangleIndex + 1;
                const collectable =
                    isFarthestTriangle && collectableByHigherDice;

                return diceAndTriangleAreEqual || collectable;
            });

            if (shouldPickable) {
                const deleteDicesFrom = diceAndTriangleAreEqual
                    ? validDiceIndex
                    : maxDiceIndex;

                const tIndex = diceAndTriangleAreEqual
                    ? triangleIndex
                    : await transformCollectAreaIndex(
                          player,
                          farthestTriangleIndex
                      );

                return this._handleCollect(deleteDicesFrom, 1, tIndex);
            }

            const collectArea = await calculateCollectArea(player, layout);
            const calculateMovableParams = await customPromise(
                (): CalculateMovableParams => ({
                    dices,
                    layout: collectArea,
                    player,
                    startIndex: triangleIndex,
                })
            );
            const usedIndexes = await calculateUsedDices(
                calculateMovableParams
            );

            const deleteDicesCount = usedIndexes.length;
            const shouldMoveAndPick = deleteDicesCount > 0;
            if (shouldMoveAndPick)
                return this._handleCollect(0, deleteDicesCount, triangleIndex);

            return this._handleNotCollected();
        }

        return this._handleNotCollected();
    }

    private async _handleCollect(
        deleteDicesFrom: number,
        deleteDicesCount: number,
        _triangleIndex: number
    ) {
        const triangleIndex = INDEX_MAP[this.player](_triangleIndex);
        const triangle = this.layout[triangleIndex];
        const [owner, points] = triangle;
        const newPoints = points - 1;

        const resolves = await Promise.all([
            asyncParser(this.brokens),
            asyncParser(this.layout),
        ]);
        const [brokens, layout] = resolves;

        // Paint new layout
        layout[triangleIndex] = [
            newPoints < 1 ? PLAYERS.NONE : owner,
            newPoints,
        ];

        // Delete used dice
        const dice = await this.deleteDice(deleteDicesFrom, deleteDicesCount);

        // Increase collected points
        const collected = await this._increaseCollected(this.player);

        return generateAsyncObj(brokens, dice, layout, collected);
    }

    async validateTarget(
        data: EmitRound,
        validDice: number[],
        player: Round['player']
    ) {
        const { fromTriangleIndex, toTriangleIndex } = data;
        const { dice, layout } = this;

        const validTriangleIndexes = await filterValidTriangleIndexes(
            validDice,
            dice[0] === dice[1],
            fromTriangleIndex,
            player,
            layout
        );

        const targetIsValid = await validateTargetTriangle(
            validTriangleIndexes,
            toTriangleIndex
        );

        if (!targetIsValid)
            throw new InvalidTriangleError(
                toTriangleIndex,
                validTriangleIndexes
            );

        return targetIsValid;
    }

    async handleBrokens(
        shouldCapture: boolean,
        owner: keyof Round['brokens'],
        player: Round['player']
    ) {
        const brokens = await asyncParser(this.brokens);

        const opponentPointIsBroken =
            shouldCapture && owner === OPPONENT[player];

        // Increase opponent broken points
        if (opponentPointIsBroken) {
            brokens[owner] += 1;
        }

        return brokens;
    }

    async handleLayout(
        fromTriangleIndex: number,
        toTriangleIndex: number,
        player: Round['player'],
        shouldCapture: boolean,
        points: number
    ) {
        const layout = await asyncParser(this.layout);

        // Print layout
        const prevTriangle = layout[fromTriangleIndex];
        const updatedPrevTrianglePoints = prevTriangle[1] - 1;
        const isPrevWillBeEmpty = updatedPrevTrianglePoints < 1;

        // Update initial triangle
        layout[fromTriangleIndex] = [
            isPrevWillBeEmpty ? PLAYERS.NONE : prevTriangle[0],
            updatedPrevTrianglePoints,
        ];

        // Update target triangle
        handleTriangleLayout(
            layout,
            toTriangleIndex,
            player,
            shouldCapture,
            points
        );

        return layout;
    }

    async handleDice(
        toTriangleIndex: number,
        fromTriangleIndex: number,
        validDice: number[]
    ) {
        const dice = await asyncParser(this.dice);
        const usedDice = Math.abs(toTriangleIndex - fromTriangleIndex);
        await deleteUsedDice(dice, validDice, usedDice);
        return dice;
    }

    async deleteDice(deleteDicesFrom: number, deleteDicesCount = 1) {
        const dice = await asyncParser(this.dice);

        await customPromise(() => {
            dice.splice(deleteDicesFrom, deleteDicesCount);
        });

        return dice;
    }

    private async _increaseCollected(player: Round['player']) {
        const collected = await asyncParser(this.collected);
        collected[player] += 1;
        return collected;
    }

    private _handleNotCollected() {
        return customPromise(() => null);
    }
}

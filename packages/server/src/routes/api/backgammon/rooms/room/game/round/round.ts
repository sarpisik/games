import {
    EmitRound,
    OPPONENT,
    PLAYERS,
    Round as R,
} from '@shared-types/backgammon';
import asyncParser from '@shared/asyncParser';
import { InvalidTriangleError } from '@shared/error';
import {
    deleteUsedDice,
    filterValidDice,
    filterValidTriangleIndexes,
    rollDice,
    validateTargetTriangle,
} from './utils';

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

        return { brokens, dice, layout };
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
        layout[toTriangleIndex] = [player, shouldCapture ? 1 : points + 1];

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
}

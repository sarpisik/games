import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise, customPromiseLoop } from '@shared/customPromise';

interface Params {
    isDouble: boolean;
    possibleDices: number[];
    startIndex: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    layout: Round['layout'];
}

export default async function calculateMovable(params: Params) {
    const { isDouble, possibleDices, startIndex, player, layout } = params;

    const movableParams = await customPromise(() => ({
        validDices: possibleDices,
        layout,
        startIndex,
        player,
    }));

    const movable = isDouble
        ? await calculatedDoubleDiceMovable(movableParams)
        : await calculateDiceMovable(movableParams);

    return movable;
}

interface MovableParams {
    validDices: number[];
    layout: Params['layout'];
    startIndex: Params['startIndex'];
    player: Params['player'];
}

async function calculatedDoubleDiceMovable(params: MovableParams) {
    const { validDices, layout, startIndex, player } = params;
    let shouldMovable = true;

    await customPromiseLoop(validDices.length - 1, function onLoopTriangleIndex(
        i,
        COMMANDS
    ) {
        const tIndex = validDices[i] - 1;

        const isOverStart = tIndex > startIndex;
        if (isOverStart) return COMMANDS.BREAK;

        const triangle = layout[tIndex];
        const blocked = triangleIsBlocked(player, triangle);
        if (blocked) {
            shouldMovable = false;
            return COMMANDS.BREAK;
        }

        return COMMANDS.CONTINUE;
    });

    return shouldMovable;
}

async function calculateDiceMovable(params: MovableParams) {
    const { validDices, layout, startIndex, player } = params;
    let shouldMovable = true;

    await customPromiseLoop(validDices.length - 1, function onLoopTriangleIndex(
        i,
        COMMANDS
    ) {
        const tIndex = validDices[i] - 1;

        const isOverStart = tIndex > startIndex;
        if (isOverStart) {
            shouldMovable = false;
            return COMMANDS.BREAK;
        }

        const triangle = layout[tIndex];
        const blocked = triangleIsBlocked(player, triangle);
        if (blocked) {
            shouldMovable = false;
            return COMMANDS.BREAK;
        }

        return COMMANDS.CONTINUE;
    });

    return shouldMovable;
}

function triangleIsBlocked(
    player: Params['player'],
    triangle: Params['layout'][number]
) {
    const [owner, points] = triangle;
    const isTaken = owner !== 0;
    const isOpponent = isTaken && owner !== player;
    const isBlocked = isOpponent && points > 1;

    return isBlocked;
}

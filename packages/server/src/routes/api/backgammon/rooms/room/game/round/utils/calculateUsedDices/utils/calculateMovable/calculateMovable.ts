import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';
import { calculatedDoubleDiceMovable, calculateDiceMovable } from './utils';

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

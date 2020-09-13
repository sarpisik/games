import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';
import {
    calculateDices,
    calculateIsStack,
    calculateMovable,
    calculateUsedDiceIndexes,
} from './utils';

interface Params {
    dices: number[];
    startIndex: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    layout: Round['layout'];
}

type CalculateMovableParams = Parameters<typeof calculateMovable>[0];
type CalculateUsedDicesParams = Parameters<typeof calculateUsedDiceIndexes>[0];

export default async function calculateUsedDices(params: Params) {
    const { dices, startIndex, player, layout } = params;

    const resolves = await calculateDices(dices);
    const [isDouble, possibleDices] = resolves;

    const calculateMovableParams = await customPromise(
        (): CalculateMovableParams => ({
            isDouble,
            layout,
            player,
            possibleDices,
            startIndex,
        })
    );
    const movable = await calculateMovable(calculateMovableParams);
    if (!movable) return [];

    const inStack = await calculateIsStack(startIndex, possibleDices);
    if (!inStack) return [];

    const usedDicesParams = await customPromise(
        (): CalculateUsedDicesParams => ({
            possibleDices,
            isDouble,
            startIndex,
        })
    );
    const usedDices = await calculateUsedDiceIndexes(usedDicesParams);

    return usedDices;
}

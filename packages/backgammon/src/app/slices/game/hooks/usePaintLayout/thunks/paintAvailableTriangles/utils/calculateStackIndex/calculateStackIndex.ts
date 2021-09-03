import { PLAYERS, Round } from 'types/lib/backgammon';
import {
    filterFarthestTriangle,
    filterMaxDice,
    filterValidDice,
} from './utils';

type StackIndex = number[];

const STACK_INDEX = 24;

export default async function calculateStackIndex(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    fromTriangleIndex: number,
    dices: Round['dice'],
    layout: Round['layout']
): Promise<StackIndex> {
    let stackIndex: StackIndex = [];
    const triangleIndex = layout.length - 1 - fromTriangleIndex;

    const [
        validDiceIndex,
        farthestTriangleIndex,
        maxDiceIndex,
    ] = await Promise.all([
        filterValidDice(triangleIndex, dices),
        filterFarthestTriangle(layout, player),
        filterMaxDice(dices),
    ]);

    const diceAndTriangleAreEqual = validDiceIndex > -1;
    const isFarthestTriangle = fromTriangleIndex === farthestTriangleIndex;
    const collectableByHigherDice = dices[maxDiceIndex] > triangleIndex + 1;

    const shouldCollectable =
        diceAndTriangleAreEqual ||
        (isFarthestTriangle && collectableByHigherDice);

    if (shouldCollectable) stackIndex.push(STACK_INDEX);

    return stackIndex;
}

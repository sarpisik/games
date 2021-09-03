import { transformCollectAreaIndex } from '../shared';
import {
    filterFarthestTriangle,
    filterMaxDice,
    filterValidDiceIndex,
} from './utils';

interface Params {
    dices: number[];
    fromTriangleIndex: number;
    layout: number[][];
    player: Parameters<typeof filterFarthestTriangle>[1];
    triangleIndex: number;
}

type ReturnPickable = Pickable | null;

interface Pickable {
    deleteDicesFrom: number;
    tIndex: number;
}

export async function calculatePickable(
    params: Params
): Promise<ReturnPickable> {
    const { dices, fromTriangleIndex, layout, player, triangleIndex } = params;

    const results = await Promise.all([
        filterValidDiceIndex(triangleIndex, dices),
        filterFarthestTriangle(layout, player),
        filterMaxDice(dices),
    ]);
    const [validDiceIndex, farthestTriangleIndex, maxDiceIndex] = results;

    const diceAndTriangleAreEqual = validDiceIndex > -1;
    const isFarthestTriangle = fromTriangleIndex === farthestTriangleIndex;
    const collectableByHigherDice = dices[maxDiceIndex] > triangleIndex + 1;
    const collectable = isFarthestTriangle && collectableByHigherDice;
    const shouldPickable = diceAndTriangleAreEqual || collectable;

    if (shouldPickable) {
        const deleteDicesFrom = diceAndTriangleAreEqual
            ? validDiceIndex
            : maxDiceIndex;

        const tIndex = diceAndTriangleAreEqual
            ? triangleIndex
            : await transformCollectAreaIndex(player, farthestTriangleIndex);

        return { deleteDicesFrom, tIndex };
    }

    return null;
}

export function shouldPickable(pickable: ReturnPickable): pickable is Pickable {
    return Boolean(pickable);
}

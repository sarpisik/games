import { EmitCollectPointRound } from '@shared-types/backgammon';
import Round from '../../round';
import { calculateShouldCollect } from '../../utils';
import {
    calculateCollectArea,
    calculatePickable,
    calculateUsedDices,
    shouldPickable,
    transformCollectAreaIndex,
} from './utils';

export default async function calculateCollectPoint(
    this: Round,
    data: EmitCollectPointRound
) {
    const { fromTriangleIndex } = data;
    const { player, layout, dice: dices } = this;

    const shouldCollect = await calculateShouldCollect(player, layout);
    if (shouldCollect) {
        const triangleIndex = await transformCollectAreaIndex(
            player,
            fromTriangleIndex
        );

        const pickable = await calculatePickable({
            dices,
            fromTriangleIndex,
            layout,
            player,
            triangleIndex,
        });

        if (shouldPickable(pickable)) {
            const { deleteDicesFrom, tIndex } = pickable;
            return this._handleCollect(deleteDicesFrom, 1, tIndex);
        }

        const collectArea = await calculateCollectArea(player, layout);
        const usedIndexes = await calculateUsedDices({
            dices,
            layout: collectArea,
            player,
            startIndex: triangleIndex,
        });

        const deleteDicesCount = usedIndexes.length;
        const shouldMoveAndPick = deleteDicesCount > 0;
        if (shouldMoveAndPick)
            return this._handleCollect(0, deleteDicesCount, triangleIndex);

        return this._handleNotCollected();
    }

    return this._handleNotCollected();
}

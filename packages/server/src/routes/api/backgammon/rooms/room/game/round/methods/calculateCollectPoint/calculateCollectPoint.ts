import { EmitCollectPointRound } from '@shared-types/backgammon';
import Round from '../../round';
import { calculateShouldCollect } from '../../utils';
import {
    calculateMoveAndPick,
    calculatePickable,
    shouldMoveAndPick,
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

        const params: Parameters<typeof calculatePickable>[0] = {
            dices,
            fromTriangleIndex,
            layout,
            player,
            triangleIndex,
        };
        const pickable = await calculatePickable(params);

        if (shouldPickable(pickable)) {
            const { deleteDicesFrom, tIndex } = pickable;
            return this._handleCollect(deleteDicesFrom, 1, tIndex);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete params.fromTriangleIndex;
        const moveAndPick = await calculateMoveAndPick(params);

        if (shouldMoveAndPick(moveAndPick))
            return this._handleCollect(0, moveAndPick, triangleIndex);

        return this._handleNotCollected();
    }

    return this._handleNotCollected();
}

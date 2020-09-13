import { calculateCollectArea, calculateUsedDices } from './utils';

type _Params = Parameters<typeof calculateUsedDices>[0];
export interface Params extends Omit<_Params, 'startIndex'> {
    dices: number[];
    triangleIndex: _Params['startIndex'];
}
type ReturnMoveAndPick = number | false;

export async function calculateMoveAndPick(
    params: Params
): Promise<ReturnMoveAndPick> {
    const { player, layout, dices, triangleIndex } = params;
    const collectArea = await calculateCollectArea(player, layout);
    const usedIndexes = await calculateUsedDices({
        dices,
        layout: collectArea,
        player,
        startIndex: triangleIndex,
    });

    const deleteDicesCount = usedIndexes.length;
    const shouldMoveAndPick = deleteDicesCount > 0;

    return shouldMoveAndPick ? deleteDicesCount : false;
}

export function shouldMoveAndPick(
    tested: ReturnMoveAndPick
): tested is Exclude<ReturnMoveAndPick, false> {
    return typeof tested === 'number';
}

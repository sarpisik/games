import { PLAYERS, Round } from '@shared-types/backgammon';
import { getAreaExcludedCollectArea } from '../getAreaExcludedCollectArea';
import { calculateShouldMove } from '../calculateShouldMove';

export default async function calculateShouldCollect(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    layout: Round['layout']
) {
    const collectArea = await getAreaExcludedCollectArea(player, layout);
    const shouldMove = await calculateShouldMove(player, collectArea);

    return !shouldMove;
}

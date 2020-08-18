import { PLAYERS, Round } from '@shared-types/backgammon';
import { calculateCollectArea } from '../calculateCollectArea';
import { calculateShouldMove } from '../calculateShouldMove';

export default async function calculateShouldCollect(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    layout: Round['layout']
) {
    const collectArea = await calculateCollectArea(player, layout);
    const shouldMove = await calculateShouldMove(player, collectArea);

    return !shouldMove;
}

import { PLAYERS, Round } from '@shared-types/backgammon';

export function calculateTriangleIsBlocked(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    triangle: Round['layout'][number]
) {
    const [owner, points] = triangle;
    const isTaken = owner !== 0;
    const isOpponent = isTaken && owner !== player;
    const isBlocked = isOpponent && points > 1;

    return isBlocked;
}

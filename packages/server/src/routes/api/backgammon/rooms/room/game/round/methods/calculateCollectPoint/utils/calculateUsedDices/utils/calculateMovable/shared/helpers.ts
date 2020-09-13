import { MovableParams } from './types';

export function triangleIsBlocked(
    player: MovableParams['player'],
    triangle: MovableParams['layout'][number]
) {
    const [owner, points] = triangle;
    const isTaken = owner !== 0;
    const isOpponent = isTaken && owner !== player;
    const isBlocked = isOpponent && points > 1;

    return isBlocked;
}

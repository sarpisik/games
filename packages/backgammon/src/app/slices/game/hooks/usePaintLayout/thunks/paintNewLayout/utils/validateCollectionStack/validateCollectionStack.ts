import { PLAYERS } from 'types/lib/backgammon';
import { LAYOUTS } from '../../../../../../../../../components/Board/constants';

export default function validateCollectionStack(
    targetX: number,
    targetY: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK
) {
    const isWhite = player === PLAYERS.WHITE;
    const containerIndex = isWhite ? 3 : 0;
    const CONTAINER = LAYOUTS.CONTAINERS[containerIndex];
    const { x, y, width, height } = CONTAINER;

    const isInside =
        targetX >= x &&
        targetX <= x + width &&
        targetY >= y &&
        targetY <= y + height;

    return isInside;
}

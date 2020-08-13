import { PLAYERS } from 'types/lib/backgammon';
import { Containers } from '../../../../../../../measures/measures';

interface Params {
    targetX: number;
    targetY: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    containers: Containers;
}

export default function validateCollectionStack(params: Params) {
    const { targetX, targetY, player, containers } = params;

    const isWhite = player === PLAYERS.WHITE;
    const containerIndex = isWhite ? 3 : 0;
    const CONTAINER = containers[containerIndex];
    const { x, y, width, height } = CONTAINER;

    const isInside =
        targetX >= x &&
        targetX <= x + width &&
        targetY >= y &&
        targetY <= y + height;

    return isInside;
}

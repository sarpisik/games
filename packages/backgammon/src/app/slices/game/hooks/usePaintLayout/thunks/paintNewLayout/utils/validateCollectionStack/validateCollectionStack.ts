import { PLAYERS } from 'types/lib/backgammon';
import { Containers } from '../../../../../../../measures/measures';

interface Params {
    targetX: number;
    targetY: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    containers: Containers;
}

const CONTAINER_INDEX_MAP = {
    [PLAYERS.BLACK]: 0,
    [PLAYERS.WHITE]: 1,
};

export default function validateCollectionStack(params: Params) {
    const { targetX, targetY, player, containers } = params;

    const containerIndex = CONTAINER_INDEX_MAP[player];
    const CONTAINER = containers[containerIndex];
    const { x, y, width, height } = CONTAINER;

    const isInside =
        targetX >= x &&
        targetX <= x + width &&
        targetY >= y &&
        targetY <= y + height;

    return isInside;
}

import { Containers } from '../../../../../../../measures/measures';

interface Params {
    targetX: number;
    targetY: number;
    container: Containers[1];
}

export default function validateCollectionStack(params: Params) {
    const { targetX, targetY, container } = params;
    const { x, y, width, height } = container;

    const isInside =
        targetX >= x &&
        targetX <= x + width &&
        targetY >= y &&
        targetY <= y + height;

    return isInside;
}

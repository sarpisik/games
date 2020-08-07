import { DIRECTIONS } from '../../../types';
import { CIRCLE_SIZE } from '../../../../../../shared/components/Point/components/Circle/constants';

export function xOffsetCalculator(
    index: number,
    xOffset: number,
    direction: DIRECTIONS.FORMARD | DIRECTIONS.BACKWARD
) {
    const startFrom = xOffset;
    const skip = calculateSkip(index);

    return direction === 'forward' ? startFrom + skip : startFrom - skip;
}

export function yOffsetCalculator(index: number, yOffset: number) {
    const isBottomBlock = yOffset > 1;
    const startFrom = yOffset;
    const skip = calculateSkip(index);

    return startFrom + skip * (isBottomBlock ? -1 : 1);
}

function calculateSkip(index: number) {
    return CIRCLE_SIZE.RADIUS * (2 * index + 1);
}

import { OFFSETS } from '../../../../../../../../../../../../../configs';
import { DIRECTIONS } from '../../../types';

const { POINT_SIZE, POINT_BOTTOM_START_Y } = OFFSETS;

export function xOffsetCalculator(
    index: number,
    xOffset: number,
    direction: DIRECTIONS.FORMARD | DIRECTIONS.BACKWARD
) {
    const startFrom = xOffset;
    const forwarddirection = direction === 'forward';
    const skip = POINT_SIZE * (forwarddirection ? index : index + 1); // calculateSkip(index);

    return forwarddirection ? startFrom + skip : startFrom - skip;
}

export function yOffsetCalculator(
    index: number,
    pointsCount: number,
    yOffset: number
) {
    const isTopBlock = yOffset < POINT_BOTTOM_START_Y;

    const shouldOverlay = pointsCount > 4;

    let skip = index * (isTopBlock ? 1 : -1);

    skip *= shouldOverlay ? 8.5 / pointsCount : POINT_SIZE;

    const offset = yOffset + skip;

    return offset;
}

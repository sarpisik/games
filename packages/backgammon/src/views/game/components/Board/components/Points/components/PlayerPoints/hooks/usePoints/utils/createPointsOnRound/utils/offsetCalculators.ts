import { CIRCLE_SIZE } from '../../../../../../shared/components/Point/components/Circle/constants';
import { DIRECTIONS } from '../../../types';

export function xOffsetCalculator(
    index: number,
    xOffset: number,
    direction: DIRECTIONS.FORMARD | DIRECTIONS.BACKWARD
) {
    const startFrom = xOffset;
    const skip = calculateSkip(index);

    return direction === 'forward' ? startFrom + skip : startFrom - skip;
}

export function yOffsetCalculator(
    index: number,
    pointsCount: number,
    yOffset: number
) {
    const isBottomBlock = yOffset > 1;
    const startFrom = yOffset;
    const overPoints = calculateOverPoints(pointsCount);
    const overSize = calculateOverSize(overPoints);
    const overFlowPerEachPoint = calculateOverFlowPerEachPoint(
        overSize,
        pointsCount
    );

    let skip = calculateSkip(index);
    if (overFlowPerEachPoint > 0) {
        // Overlay points on each other
        skip -= overFlowPerEachPoint * index;
    }

    return startFrom + skip * (isBottomBlock ? -1 : 1);
}

function calculateSkip(index: number) {
    return (
        CIRCLE_SIZE.RADIUS * // 1.5
        (2 * index + 1)
    );
}

function calculateOverPoints(count: number) {
    const limit = 5;
    return count - limit;
}

function calculateOverSize(overPoints: number) {
    const pointSize = CIRCLE_SIZE.RADIUS * 2;
    return overPoints * pointSize;
}

function calculateOverFlowPerEachPoint(overSize: number, pointsCount: number) {
    return overSize / pointsCount;
}

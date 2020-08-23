import { CIRCLE_SIZE } from '../../../../../../shared/components/Point/components/Circle/constants';
import { DIRECTIONS } from '../../../types';
import { calculateWindowDimension } from '../../../../../../../../../../../../../utils';

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
    const { isLandscape, orientation } = calculateWindowDimension();
    const dynamicOffset = isLandscape ? orientation : 1;
    const isBottomBlock = yOffset > 25;

    const startFrom = yOffset;
    const overPoints = calculateOverPoints(pointsCount);
    const overSize = calculateOverSize(overPoints);
    const overFlowPerEachPoint = calculateOverFlowPerEachPoint(
        overSize,
        pointsCount
    );

    let skip = calculateSkip(index) * dynamicOffset;
    const dynamicSkip = isBottomBlock ? skip * -1 : skip;

    if (overFlowPerEachPoint > 0) {
        // Overlay points on each other
        skip -= overFlowPerEachPoint * index;
    }

    return startFrom + dynamicSkip;
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

import { CIRCLE_SIZE } from '../../../../../../shared/components/Point/components/Circle/constants';
import { DIRECTIONS } from '../../../types';
import { calculateWindowDimension } from '../../../../../../../../../../../../../utils';
import { MAX_WIDTH } from '../../../../../../../../../../../../../config';

export function xOffsetCalculator(
    index: number,
    xOffset: number,
    direction: DIRECTIONS.FORMARD | DIRECTIONS.BACKWARD
) {
    const startFrom = xOffset;
    const skip = calculateSkip(index);

    return direction === 'forward' ? startFrom + skip : startFrom - skip;
}

const CIRCLE_SIZE_FULL = CIRCLE_SIZE.RADIUS * 2;

export function yOffsetCalculator(
    index: number,
    pointsCount: number,
    yOffset: number,
    heightLimit: number
) {
    const {
        isLandscape,
        windowWidth,
        windowHeight,
    } = calculateWindowDimension();
    const orientation = calculateOrientation(
        isLandscape,
        windowWidth,
        windowHeight
    );
    const dynamicOffset = isLandscape ? orientation : 1;
    const isBottomBlock = yOffset > 25;

    const pointSize = calculatePointSize(dynamicOffset);
    const overPoints = calculateOverPoints(pointsCount, pointSize, heightLimit);
    const overSize = isLandscape
        ? overPoints
        : calculateOverSize(overPoints, pointSize);
    const overFlowPerEachPoint = calculateOverFlowPerEachPoint(
        overSize,
        pointsCount
    );

    let skip = calculateSkip(index) * dynamicOffset;
    if (overFlowPerEachPoint > 0) {
        // Overlay points on each other
        skip -= overFlowPerEachPoint * index;
    }

    const dynamicSkip = isBottomBlock ? skip * -1 : skip;
    return yOffset + dynamicSkip;
}

function calculateOrientation(
    isLandscape: boolean,
    _width: number,
    height: number,
    maxWidth = MAX_WIDTH
) {
    const width = isLandscape ? _width * maxWidth : _width;
    return width / height;
}

function calculateSkip(index: number) {
    return (
        CIRCLE_SIZE.RADIUS * // 1.5
        (2 * index + 1)
    );
}

function calculatePointSize(dynamicOffset: number) {
    return CIRCLE_SIZE_FULL * dynamicOffset;
}

function calculateOverPoints(
    count: number,
    pointSize: number,
    heightLimit: number
) {
    const pointsSize = count * pointSize;
    const overPoints = pointsSize - heightLimit;
    return overPoints;
}

function calculateOverSize(overPoints: number, pointSize: number) {
    return overPoints * pointSize;
}

function calculateOverFlowPerEachPoint(overSize: number, pointsCount: number) {
    return overSize / pointsCount;
}

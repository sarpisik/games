import { CIRCLE_SIZE } from '../../../../../../shared/components/Point/components/Circle/constants';
import { DIRECTIONS } from '../../../types';
import { calculateWindowDimension } from '../../../../../../../../../../../../../utils';
import { MAX_WIDTH } from '../../../../../../../../../../../../../config';

const CIRCLE_SIZE_FULL = CIRCLE_SIZE.RADIUS * 2;

export function xOffsetCalculator(
    index: number,
    xOffset: number,
    direction: DIRECTIONS.FORMARD | DIRECTIONS.BACKWARD
) {
    const startFrom = xOffset;
    const forwarddirection = direction === 'forward';
    const skip = CIRCLE_SIZE_FULL * (forwarddirection ? index : index + 1); // calculateSkip(index);

    return forwarddirection ? startFrom + skip : startFrom - skip;
}

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

    const dynamicOffset = orientation;
    const isBottomBlock = yOffset > 25;

    const pointSize = calculatePointSize(dynamicOffset);
    const overPoints = calculateOverPoints(pointsCount, pointSize, heightLimit);
    const overFlowPerEachPoint = calculateOverFlowPerEachPoint(
        overPoints,
        pointsCount
    );

    const _skip = calculateSkip(index);
    let skip = _skip * dynamicOffset;
    if (overFlowPerEachPoint > 0) {
        // Overlay points on each other
        skip -= overFlowPerEachPoint * index;
    }

    const dynamicSkip = isBottomBlock ? skip * -1 - pointSize : skip;
    const offset = yOffset + dynamicSkip;
    return offset;
}

function calculateOrientation(
    isLandscape: boolean,
    _width: number,
    height: number,
    maxWidth = MAX_WIDTH
) {
    const width = isLandscape ? _width * maxWidth : _width;
    return isLandscape ? width / height : height / width;
}

function calculateSkip(index: number) {
    return (
        // CIRCLE_SIZE.RADIUS * // 1.5
        CIRCLE_SIZE_FULL * index
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

function calculateOverFlowPerEachPoint(overSize: number, pointsCount: number) {
    return overSize / pointsCount;
}

import { MAX_WIDTH, OFFSETS } from '../../../../../config';
import { calculateWindowDimension } from '../../../../../utils';

export const TRIANGLE_WIDTH = 3;
export const TRIANGLE_HEIGHT = 20;

export default function calculateSizes() {
    const {
        isLandscape,
        windowHeight,
        windowWidth,
        orientation,
    } = calculateWindowDimension();

    const BOARD_WIDTH = isLandscape ? windowWidth * MAX_WIDTH : windowWidth;
    const BOARD_HEIGHT = isLandscape ? windowHeight : windowWidth * orientation;

    return Object.assign(
        {
            // board
            BOARD_WIDTH,
            BOARD_HEIGHT,
        },
        OFFSETS
    );
}

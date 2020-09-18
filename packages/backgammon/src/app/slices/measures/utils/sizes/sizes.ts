import { MAX_WIDTH, OFFSETS } from '../../../../../configs';
import { calculateWindowDimension } from '../../../../../utils';

export const TRIANGLE_WIDTH = 3;
export const TRIANGLE_HEIGHT = 20;

export default function calculateSizes() {
    const { isLandscape, windowWidth } = calculateWindowDimension();

    const BOARD_WIDTH = isLandscape ? windowWidth * MAX_WIDTH : windowWidth;
    const BOARD_HEIGHT = BOARD_WIDTH * (768 / 1366);

    return Object.assign(
        {
            // board
            BOARD_WIDTH,
            BOARD_HEIGHT,
            ORIENTATION: isLandscape ? 'landscape' : 'portrait',
        },
        OFFSETS
    );
}

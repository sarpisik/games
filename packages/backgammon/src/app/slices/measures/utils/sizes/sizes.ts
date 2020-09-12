import { MAX_WIDTH } from '../../../../../config';
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

    return {
        // board
        BOARD_WIDTH,
        BOARD_HEIGHT,

        // container
        CONTAINER_WIDTH: 3,
        CONTAINER_HEIGHT: 17,

        // block
        BLOCK_WIDTH: 18,
        BLOCK_HEIGHT: 48,

        // triangle
        TRIANGLE_WIDTH,
        TRIANGLE_HEIGHT,

        // point
        POINT_SIZE: TRIANGLE_WIDTH / 2,
    };
}

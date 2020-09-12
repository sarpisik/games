export enum ROUTES {
    HOME = '/',
    ROOMS = '/rooms',
    SIGN_OUT = '/signout',
    PROFILE = '/profile',
    GAME_DEMO = '/game-demo',
}

export const MAX_WIDTH = 0.75;

export const COLORS = {
    // frame
    BOARD_BORDER: '#663300',
    BOARD_INNER: '#B88A00',

    // triangle
    HIGHLIGHT: 'yellow',
    EVEN: '#ADAD85',
    ODD: '#FF471A',
    BORDER: '#444',
};

export const PIXEL = 0.02; // 1 square = 2 unit.

const TRIANGLE_WIDTH = 3;
const TRIANGLE_HEIGHT = 20;
export const OFFSETS = {
    /*
     *
     * OFFSETS
     *
     */

    // Y offet
    TOP_CONTAINER_START_Y: 1,
    BOTTOM_CONTAINER_START_Y: 49,
    TOP_BLOCK_START_Y: 1,
    BOTTOM_BLOCK_START_Y: 49,

    // X offset
    LEFT_CONTAINER_START_X: 1,
    RIGHT_CONTAINER_START_X: 46,
    LEFT_BLOCK_START_X: 5,
    LEFT_BLOCK_END_X: 20,
    RIGHT_BLOCK_START_X: 24,
    RIGHT_BLOCK_END_X: 39,
    RIGHT_BLOCK_TRIANGLE_END_X: 39 + TRIANGLE_WIDTH,
    LEFT_BLOCK_TRIANGLE_END_X: 20 + TRIANGLE_WIDTH,

    /*
     *
     * SIZES
     *
     */

    // block
    BLOCK_WIDTH: 18,
    BLOCK_HEIGHT: 48,

    // container
    CONTAINER_WIDTH: 3,
    CONTAINER_HEIGHT: 17,

    // triangle
    TRIANGLE_WIDTH,
    TRIANGLE_HEIGHT,

    // point
    POINT_SIZE: TRIANGLE_WIDTH / 2,
};

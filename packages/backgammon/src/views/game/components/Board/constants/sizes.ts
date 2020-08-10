const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const isLandscape = windowWidth > windowHeight;

const BOARD_WIDTH = isLandscape ? windowHeight : windowWidth;
const TRIANGLE_WIDTH = 3;

export default {
    // board
    BOARD_WIDTH,
    BOARD_HEIGHT: BOARD_WIDTH,

    // container
    CONTAINER_WIDTH: 3,
    CONTAINER_HEIGHT: 20,

    // block
    BLOCK_WIDTH: 18,
    BLOCK_HEIGHT: 48,

    // point
    POINT_SIZE: TRIANGLE_WIDTH / 2,
};

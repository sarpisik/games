const TRIANGLE_WIDTH = 3;

export default function calculateSizes() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const isLandscape = windowWidth > windowHeight;

    const BOARD_WIDTH = windowWidth;
    const BOARD_HEIGHT = isLandscape ? windowHeight : windowWidth;

    return {
        // board
        BOARD_WIDTH,
        BOARD_HEIGHT,

        // container
        CONTAINER_WIDTH: 3,
        CONTAINER_HEIGHT: 20,

        // block
        BLOCK_WIDTH: 18,
        BLOCK_HEIGHT: 48,

        // triangle
        TRIANGLE_WIDTH: 3,
        TRIANGLE_HEIGHT: isLandscape ? 20 : 15,

        // point
        POINT_SIZE: TRIANGLE_WIDTH / 2,
    };
}

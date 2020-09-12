import { TRIANGLE_SIZE } from '../../../../views/game/components/Board/constants/layouts/triangles/triangle';

export default {
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
    RIGHT_BLOCK_TRIANGLE_END_X: 39 + TRIANGLE_SIZE.width,
    LEFT_BLOCK_TRIANGLE_END_X: 20 + TRIANGLE_SIZE.width,
};

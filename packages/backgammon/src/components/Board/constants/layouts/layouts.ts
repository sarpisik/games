import OFFSETS from '../offsets';
import SIZES from '../sizes';
import COLORS from '../colors';
import { TRIANGLES } from './triangles';

const {
    BOTTOM_CONTAINER_START_Y,
    LEFT_BLOCK_START_X,
    LEFT_CONTAINER_START_X,
    RIGHT_BLOCK_START_X,
    RIGHT_CONTAINER_START_X,
    TOP_BLOCK_START_Y,
    TOP_CONTAINER_START_Y,
} = OFFSETS;

export default {
    CONTAINERS: [
        // Top left
        {
            x: LEFT_CONTAINER_START_X,
            y: TOP_CONTAINER_START_Y,
        },
        // Top right
        {
            x: RIGHT_CONTAINER_START_X,
            y: TOP_CONTAINER_START_Y,
        },
        // Bottom right
        {
            x: RIGHT_CONTAINER_START_X,
            y: BOTTOM_CONTAINER_START_Y,
        },
        // Bottom left
        {
            x: LEFT_CONTAINER_START_X,
            y: BOTTOM_CONTAINER_START_Y,
        },
    ].map((container, key) => ({
        ...container,
        color: COLORS.BOARD_INNER,
        height: SIZES.CONTAINER_HEIGHT,
        key,
        width: SIZES.CONTAINER_WIDTH,
    })),
    BLOCKS: [
        // Left block
        {
            x: LEFT_BLOCK_START_X,
            y: TOP_BLOCK_START_Y,
        },
        // Right block
        {
            x: RIGHT_BLOCK_START_X,
            y: TOP_BLOCK_START_Y,
        },
    ].map((block, key) => ({
        ...block,
        color: COLORS.BOARD_INNER,
        height: SIZES.BLOCK_HEIGHT,
        key,
        width: SIZES.BLOCK_WIDTH,
    })),
    TRIANGLES,
};

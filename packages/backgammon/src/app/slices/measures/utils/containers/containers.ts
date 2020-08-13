import { COLORS, OFFSETS } from '../../contants';
import { calculateSizes } from '../sizes';

const {
    BOTTOM_CONTAINER_START_Y,
    LEFT_CONTAINER_START_X,
    RIGHT_CONTAINER_START_X,
    TOP_CONTAINER_START_Y,
} = OFFSETS;

export default function calculateContainers(
    sizes: ReturnType<typeof calculateSizes>
) {
    const containers = [
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
        height: sizes.CONTAINER_HEIGHT,
        key,
        width: sizes.CONTAINER_WIDTH,
    }));

    return containers;
}

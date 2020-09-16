import { OFFSETS } from '../../../../../config';
import { calculateSizes } from '../sizes';

const {
    BOTTOM_CONTAINER_START_Y,
    LEFT_BLOCK_START_X,
    TOP_CONTAINER_START_Y,
    CONTAINER_HEIGHT,
} = OFFSETS;

export default function calculateContainers(
    sizes: ReturnType<typeof calculateSizes>
) {
    const containers = [
        // Top left
        {
            x: LEFT_BLOCK_START_X,
            y: TOP_CONTAINER_START_Y,
        },
        // Bottom left
        {
            x: LEFT_BLOCK_START_X,
            y:
                CONTAINER_HEIGHT +
                (BOTTOM_CONTAINER_START_Y - CONTAINER_HEIGHT * 2),
        },
    ].map((container, key) => {
        return {
            ...container,
            height: sizes.CONTAINER_HEIGHT,
            key,
            width: sizes.CONTAINER_WIDTH,
        };
    });

    return containers;
}

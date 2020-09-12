import { COLORS, OFFSETS } from '../../../../../config';
import { calculateSizes } from '../sizes';

const {
    BOTTOM_CONTAINER_START_Y,
    LEFT_CONTAINER_START_X,
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
        // Bottom left
        {
            x: LEFT_CONTAINER_START_X,
            y: BOTTOM_CONTAINER_START_Y,
        },
    ].map((container, key) => {
        const reverse = container.y > 25;
        return {
            ...container,
            color: COLORS.BOARD_INNER,
            height: sizes.CONTAINER_HEIGHT * (reverse ? -1 : 1),
            key,
            width: sizes.CONTAINER_WIDTH,
        };
    });

    return containers;
}

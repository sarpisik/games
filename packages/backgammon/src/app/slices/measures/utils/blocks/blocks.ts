import { COLORS, OFFSETS } from '../../contants';
import { calculateSizes } from '../sizes';

const { LEFT_BLOCK_START_X, RIGHT_BLOCK_START_X, TOP_BLOCK_START_Y } = OFFSETS;

export default function calculateBlocks(
    sizes: ReturnType<typeof calculateSizes>
) {
    const blocks = [
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
        height: sizes.BLOCK_HEIGHT,
        key,
        width: sizes.BLOCK_WIDTH,
    }));

    return blocks;
}

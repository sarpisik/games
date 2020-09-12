import { calculateSizes } from '../sizes';

export default function calculateBlocks(
    sizes: ReturnType<typeof calculateSizes>
) {
    const blocks = sizes.BLOCKS.map((block, key) => ({
        ...block,
        key,
    }));

    return blocks;
}

import { calculateSizes } from '../sizes';

export default function calculateUnit(
    sizes: ReturnType<typeof calculateSizes>,
    pixel: number
) {
    const unit = sizes.BOARD_WIDTH * pixel;

    return unit;
}

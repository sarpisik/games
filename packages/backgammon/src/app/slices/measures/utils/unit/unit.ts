import { calculateSizes } from '../sizes';

export default function calculateUnit(
    sizes: ReturnType<typeof calculateSizes>,
    pixel: number
) {
    const unit = {
        x: sizes.BOARD_WIDTH * pixel,
        y: sizes.BOARD_HEIGHT * pixel,
    };

    return unit;
}

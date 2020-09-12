import { COLORS } from '../../../../../config';
import { calculateSizes } from '../sizes';

export default function calculateSidebar(
    sizes: ReturnType<typeof calculateSizes>
) {
    const {
        SIDEBAR_WIDTH,
        SIDEBAR_HEIGHT,
        SIDEBAR_START_X,
        SIDEBAR_START_Y,
    } = sizes;

    return {
        x: SIDEBAR_START_X,
        width: SIDEBAR_WIDTH,
        height: SIDEBAR_HEIGHT,
        y: SIDEBAR_START_Y,
        color: COLORS.BOARD_INNER,
        shadowColor: 'black',
        shadowBlur: 10,
        cornerRadius: 10,
    };
}

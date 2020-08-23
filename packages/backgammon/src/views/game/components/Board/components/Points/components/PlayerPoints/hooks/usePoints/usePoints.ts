import {
    useGame,
    useLayout,
    useRound,
    useSizes,
} from '../../../../../../../../../../app/slices';
import { usePointEventHandlers } from './hooks';
import { createPointsOnRound } from './utils';

export default function usePoints() {
    const layout = useLayout();
    const round = useRound();
    const sizes = useSizes();
    const { game } = useGame();
    const { onDragEnd, onDragStart } = usePointEventHandlers();

    const reducePointsFromLayout = createPointsOnRound({
        game,
        round,
        triangleHeight: sizes.TRIANGLE_HEIGHT,
        onDragEnd,
        onDragStart,
    });

    return layout.reduce(reducePointsFromLayout, []);
}

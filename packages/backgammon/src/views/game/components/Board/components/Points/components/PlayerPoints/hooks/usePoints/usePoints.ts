import {
    useGame,
    useLayout,
    useRound,
} from '../../../../../../../../../../app/slices';
import { usePointEventHandlers } from './hooks';
import { createPointsOnRound } from './utils';

export default function usePoints() {
    const layout = useLayout();
    const round = useRound();
    const { game } = useGame();
    const { onDragEnd, onDragStart } = usePointEventHandlers();

    const reducePointsFromLayout = createPointsOnRound({
        game,
        round,
        onDragEnd,
        onDragStart,
    });

    return layout.reduce(reducePointsFromLayout, []);
}

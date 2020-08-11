import {
    useLayout,
    useRound,
    useGame,
    useUser,
} from '../../../../../../../../../../app/slices';
import { usePointEventHandlers } from './hooks';
import { createPointsOnRound } from './utils';

export default function usePoints() {
    const layout = useLayout();
    const round = useRound();
    const { game } = useGame();
    const { user } = useUser();
    const { onDragEnd } = usePointEventHandlers();

    const reducePointsFromLayout = createPointsOnRound({
        user,
        game,
        round,
        onDragEnd,
    });

    return layout.reduce(reducePointsFromLayout, []);
}

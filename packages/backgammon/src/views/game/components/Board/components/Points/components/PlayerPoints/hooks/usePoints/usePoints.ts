import {
    useGame,
    useLayout,
    useRound,
} from '../../../../../../../../../../app/slices';
import { usePointEventHandlers } from './hooks';
import { createPointsOnRound } from './utils';

interface Params {
    pLight: HTMLImageElement;
    pDark: HTMLImageElement;
}

export default function usePoints(params: Params) {
    const layout = useLayout();
    const round = useRound();
    const { game } = useGame();
    const { onDragEnd, onDragStart } = usePointEventHandlers();

    const reducePointsFromLayout = createPointsOnRound({
        ...params,
        game,
        round,
        onDragEnd,
        onDragStart,
    });

    return layout.reduce(reducePointsFromLayout, []);
}

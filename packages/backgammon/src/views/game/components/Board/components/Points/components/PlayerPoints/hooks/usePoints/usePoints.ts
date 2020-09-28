import {
    useGame,
    useLayout,
    useRound,
} from '../../../../../../../../../../app/slices';
import { usePointEventHandlers, usePlaySound } from './hooks';
import { createPointsOnRound } from './utils';

interface Params {
    pLight: HTMLImageElement;
    pDark: HTMLImageElement;
}

export default function usePoints(params: Params) {
    const round = useRound();
    const { game } = useGame();
    const { onDragEnd, onDragStart } = usePointEventHandlers();
    usePlaySound(round?.layout);

    const reducePointsFromLayout = createPointsOnRound({
        ...params,
        game,
        round,
        onDragEnd,
        onDragStart,
    });

    return useLayout().reduce(reducePointsFromLayout, []);
}

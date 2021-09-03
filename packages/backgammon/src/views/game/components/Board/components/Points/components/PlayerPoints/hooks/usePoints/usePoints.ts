import {
    useLayout,
    useRoundPlayer,
    useRound,
} from '../../../../../../../../../../app/slices';
import {
    // usePlaySound,
    usePointEventHandlers,
} from './hooks';
import { createPointsOnRound } from './utils';

interface Params {
    pLight: HTMLImageElement;
    pDark: HTMLImageElement;
}

export default function usePoints(params: Params) {
    const round = useRound();
    const isRoundPlayer = useRoundPlayer();
    const { onDragEnd, onDragStart } = usePointEventHandlers();
    // usePlaySound(round?.layout);

    const reducePointsFromLayout = createPointsOnRound({
        ...params,
        isRoundPlayer,
        round,
        onDragEnd,
        onDragStart,
    });

    return useLayout().reduce(reducePointsFromLayout, []);
}

import { usePointsLayout, useRound } from '../../../../../../../../app/slices';
import { createPointsOnRound } from './utils';
import { usePointEventHandlers } from './hooks';

export default function usePoints() {
    const [layout] = usePointsLayout();
    const round = useRound();
    const { onDragEnd } = usePointEventHandlers();
    const reducePointsFromLayout = createPointsOnRound(round, onDragEnd);

    return layout.reduce(reducePointsFromLayout, []);
}

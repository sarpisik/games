import { useLayout, useRound } from '../../../../../../../../app/slices';
import { usePointEventHandlers } from './hooks';
import { createPointsOnRound } from './utils';

export default function usePoints() {
    const layout = useLayout();
    const round = useRound();
    const { onDragEnd } = usePointEventHandlers();
    const reducePointsFromLayout = createPointsOnRound(round, onDragEnd);

    return layout.reduce(reducePointsFromLayout, []);
}

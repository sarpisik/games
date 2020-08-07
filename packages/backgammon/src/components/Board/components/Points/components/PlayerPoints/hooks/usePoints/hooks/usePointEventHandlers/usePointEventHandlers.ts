import { useCallback } from 'react';
import { usePrintLayout } from '../../../../../../../../../../app/slices/pointsLayout';
import { useUnit } from '../../../../../../../../hooks/useUnit';
import { CircleProps } from '../../../../../shared/components/Point/components/Circle';

type UsePointEventhandlers = () => {
    // onDragStart: (index: number) => CircleProps['onDragStart'];
    onDragEnd: OnDragEnd;
};
export type OnDragEnd = (triangleIndex: number) => CircleProps['onDragEnd'];

const usePointEventHandlers: UsePointEventhandlers = () => {
    const { getUnit } = useUnit();
    const { paintLayout } = usePrintLayout();

    const onDragEnd: OnDragEnd = useCallback(
        (triangleIndex) => ({ target }) => {
            const targetX = getUnit(target.attrs.x);
            const targetY = getUnit(target.attrs.y);
            const color = target.attrs.fill;

            paintLayout(triangleIndex, targetX, targetY, color.toUpperCase());
        },
        [getUnit, paintLayout]
    );

    return { onDragEnd };
};

export default usePointEventHandlers;

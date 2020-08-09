import { usePaintLayout } from '../../../../../../../../../../app/slices';
import { useUnit } from '../../../../../../../../hooks/useUnit';
import { CircleProps } from '../../../../../shared/components/Point/components/Circle';

type UsePointEventhandlers = () => {
    // onDragStart: (index: number) => CircleProps['onDragStart'];
    onDragEnd: OnDragEnd;
};
export type OnDragEnd = (triangleIndex: number) => CircleProps['onDragEnd'];

const usePointEventHandlers: UsePointEventhandlers = () => {
    const { getUnit } = useUnit();
    const { paintLayout } = usePaintLayout();

    const onDragEnd: OnDragEnd = (fromTriangleIndex) => ({ target }) => {
        const targetX = getUnit(target.attrs.x);
        const targetY = getUnit(target.attrs.y);
        const color = target.attrs.fill.toUpperCase();

        paintLayout(fromTriangleIndex, targetX, targetY, color.toUpperCase());
    };

    return { onDragEnd };
};

export default usePointEventHandlers;

import { usePaintLayout } from '../../../../../../../../../../../../app/slices';
import { useUnit } from '../../../../../../../../hooks/useUnit';
import { CircleProps } from '../../../../../shared/components/Point/components/Circle';
import { generatePlayerColor } from '../../../../../shared/utils';

type UsePointEventhandlers = () => {
    onDragEnd: OnDragEnd;
    onDragStart: OnDragStart;
};
export type OnDragStart = (triangleIndex: number) => CircleProps['onDragStart'];
export type OnDragEnd = (triangleIndex: number) => CircleProps['onDragEnd'];

const usePointEventHandlers: UsePointEventhandlers = () => {
    const { getUnit } = useUnit();
    const { paintLayout, paintAvailableTriangles } = usePaintLayout();

    const onDragEnd: OnDragEnd = (fromTriangleIndex) => ({ target }) => {
        const targetX = getUnit(target.attrs.x);
        const targetY = getUnit(target.attrs.y);
        const color = generatePlayerColor(target);

        paintLayout(fromTriangleIndex, targetX, targetY, color);
    };

    const onDragStart: OnDragStart = (fromTriangleIndex) => ({ target }) => {
        const color = generatePlayerColor(target);

        paintAvailableTriangles(fromTriangleIndex, color);
    };

    return { onDragEnd, onDragStart };
};

export default usePointEventHandlers;

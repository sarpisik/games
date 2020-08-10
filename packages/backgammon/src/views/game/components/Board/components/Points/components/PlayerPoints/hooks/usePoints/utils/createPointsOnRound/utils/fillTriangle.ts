import { Point } from '../../../../../../shared/components';
import { OnDragEnd } from '../../../hooks/usePointEventHandlers';
import { yOffsetCalculator } from './offsetCalculators';

export default function fillTriangle({
    xOffset,
    yOffset,
    count,
    color,
    draggable,
    triangleIndex,
    onDragEnd,
}: // eventHandlers,
{
    xOffset: number;
    yOffset: number;
    count: number;
    color: string;
    draggable: boolean;
    triangleIndex: number;
    onDragEnd: OnDragEnd;
    // eventHandlers: any;
}) {
    const points = [] as React.ComponentProps<typeof Point>[];

    for (let index = 0; index < count; index++) {
        const x = xOffset;
        const y = yOffsetCalculator(index, yOffset);

        points.push({
            key: x * y,
            x,
            y,
            color,
            draggable,
            onDragEnd: onDragEnd(triangleIndex),
            // ...eventHandlers,
        });
    }

    return points;
}

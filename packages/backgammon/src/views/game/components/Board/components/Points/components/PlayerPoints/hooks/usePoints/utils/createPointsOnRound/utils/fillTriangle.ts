import { Point } from '../../../../../../shared/components';
import { OnDragEnd, OnDragStart } from '../../../hooks/usePointEventHandlers';
import { yOffsetCalculator } from './offsetCalculators';

interface Params {
    xOffset: number;
    yOffset: number;
    count: number;
    color: string;
    draggable: boolean;
    triangleIndex: number;
    onDragEnd: OnDragEnd;
    onDragStart: OnDragStart;
}

export default function fillTriangle(params: Params) {
    const {
        xOffset,
        yOffset,
        count,
        color,
        draggable,
        triangleIndex,
        onDragEnd,
        onDragStart,
    } = params;
    const points = [] as React.ComponentProps<typeof Point>[];

    for (let i = 0; i < count; i++) {
        const x = xOffset;
        const y = yOffsetCalculator(i, count, yOffset);

        points.push({
            key: x * y,
            x,
            y,
            color,
            draggable,
            onDragEnd: onDragEnd(triangleIndex),
            onDragStart: onDragStart(triangleIndex),
        });
    }

    return points;
}

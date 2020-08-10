import React from 'react';

import { Circle as KonvaCircle } from 'react-konva';

import { useUnitMeasure } from '../../../../../../../../hooks';

import { CIRCLE_SIZE } from './constants';
import { useDragMoveHandler } from './hooks';

export type CircleProps = React.ComponentProps<typeof KonvaCircle>;

export default function Circle({
    x = 1,
    y = 1,
    ...circleProps
}: Omit<CircleProps, 'radius'>): React.ReactElement {
    const posX = useUnitMeasure(x);
    const posY = useUnitMeasure(y);
    const radius = useUnitMeasure(CIRCLE_SIZE.RADIUS);
    const onDragMove = useDragMoveHandler();

    return (
        <KonvaCircle
            x={posX}
            y={posY}
            radius={radius}
            draggable
            onDragMove={onDragMove}
            {...circleProps}
        />
    );
}

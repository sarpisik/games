import React from 'react';

import { Circle as KonvaCircle } from 'react-konva';

import { useUnitMeasure } from '../../../../../../../../hooks';

import { CIRCLE_SIZE } from './constants';
import { useDragMoveHandler } from './hooks';
import { Image } from 'react-konva';

export type CircleProps = React.ComponentProps<typeof KonvaCircle>;

export default function Circle({
    x = 1,
    y = 1,
    fill,
    fillPatternImage,
    stroke,
    strokeWidth,
    ...circleProps
}: Omit<CircleProps, 'radius'>): React.ReactElement {
    const posX = useUnitMeasure(x, 'x');
    const posY = useUnitMeasure(y, 'y');
    const radius = useUnitMeasure(CIRCLE_SIZE.RADIUS, 'x') * 2;
    const onDragMove = useDragMoveHandler();

    return (
        <Image
            x={posX}
            y={posY}
            width={radius}
            height={radius}
            draggable
            onDragMove={onDragMove}
            image={fillPatternImage}
            {...circleProps}
        />
    );
}

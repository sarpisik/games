import React from 'react';

import { Image } from 'react-konva';

import { useUnitMeasure } from '../../../../../../../../hooks';

import { CIRCLE_SIZE } from './constants';
import { useDragMoveHandler } from './hooks';

export type CircleProps = React.ComponentProps<typeof Image>;

export default function Circle({
    x = 1,
    y = 1,
    width = CIRCLE_SIZE.RADIUS,
    fill,
    fillPatternImage,
    stroke,
    strokeWidth,
    ...circleProps
}: CircleProps): React.ReactElement {
    const posX = useUnitMeasure(x, 'x');
    const posY = useUnitMeasure(y, 'y');
    const radius = useUnitMeasure(width, 'x') * 2;
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

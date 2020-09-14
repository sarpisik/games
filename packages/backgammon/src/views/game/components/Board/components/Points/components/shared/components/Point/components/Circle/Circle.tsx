import React from 'react';

import { Image } from 'react-konva';
import { OFFSETS } from '../../../../../../../../../../../../config';

import { useUnitMeasure } from '../../../../../../../../hooks';

import { useDragMoveHandler } from './hooks';

const { TRIANGLE_WIDTH } = OFFSETS;

export type CircleProps = React.ComponentProps<typeof Image>;

export default function Circle({
    x = 1,
    y = 1,
    width = TRIANGLE_WIDTH / 2,
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

import React from 'react';
import { Image } from 'react-konva';
import { OFFSETS } from '../../../../../../../../../../../../configs';
import { SquareImage } from '../../../../../../../shared';
import { useDragMoveHandler } from './hooks';

const { TRIANGLE_WIDTH } = OFFSETS;

export type CircleProps = React.ComponentProps<typeof Image>;

export default function Circle(props: CircleProps): React.ReactElement {
    const { width = TRIANGLE_WIDTH, fillPatternImage, ...circleProps } = props;
    const onDragMove = useDragMoveHandler();

    return (
        <SquareImage
            draggable
            onDragMove={onDragMove}
            image={fillPatternImage}
            width={width}
            {...circleProps}
        />
    );
}

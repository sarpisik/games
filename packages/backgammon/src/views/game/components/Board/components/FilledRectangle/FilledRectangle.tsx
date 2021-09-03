import React from 'react';
import { Rect } from 'react-konva';
import { Rectangle } from './components';

type RectangleProps = React.ComponentProps<typeof Rect>;
export interface FilledRectangleProps extends Omit<RectangleProps, 'fill'> {
    color: RectangleProps['fill'];
}

export default function FilledRectangle(
    props: FilledRectangleProps
): React.ReactElement {
    const { color, ...rectProps } = props;

    return <Rectangle fill={color} {...rectProps} />;
}

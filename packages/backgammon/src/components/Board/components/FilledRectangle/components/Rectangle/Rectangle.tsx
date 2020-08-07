import React from 'react';

import { Rect } from 'react-konva';

import { useUnitMeasure } from '../../../../hooks';

type RectangleProps = React.ComponentProps<typeof Rect>;

export default function Rectangle({
    x = 1,
    y = 1,
    width = 1,
    height = 1,
    ...rectProps
}: RectangleProps): React.ReactElement {
    const posX = useUnitMeasure(x);
    const posY = useUnitMeasure(y);
    const sizeX = useUnitMeasure(width);
    const sizeY = useUnitMeasure(height);

    return (
        <Rect x={posX} y={posY} width={sizeX} height={sizeY} {...rectProps} />
    );
}

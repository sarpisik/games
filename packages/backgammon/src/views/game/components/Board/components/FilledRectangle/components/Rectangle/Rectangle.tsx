import React from 'react';

import { Rect } from 'react-konva';

import { useUnitMeasure } from '../../../../hooks';

type Calculation = 'x' | 'y';
type RectangleProps = React.ComponentProps<typeof Rect> & {
    calculation?: {
        width: Calculation;
        height: Calculation;
    };
};

const _calculation = { width: 'x', height: 'y' } as const;

export default function Rectangle(props: RectangleProps): React.ReactElement {
    const {
        x = 1,
        y = 1,
        width = 1,
        height = 1,
        calculation = _calculation,
        ...rectProps
    } = props;
    const posX = useUnitMeasure(x, 'x');
    const posY = useUnitMeasure(y, 'y');
    const sizeX = useUnitMeasure(width, calculation.width);
    const sizeY = useUnitMeasure(height, calculation.height);

    return (
        <Rect x={posX} y={posY} width={sizeX} height={sizeY} {...rectProps} />
    );
}

import React from 'react';
import { Image } from 'react-konva';
import { OFFSETS } from '../../../../../../../configs';
import { useUnitMeasure } from '../../../hooks';

const { POINT_SIZE } = OFFSETS;

export type SquareImageProps = React.ComponentProps<typeof Image>;

export default function SquareImage({
    x = 1,
    y = 1,
    width = POINT_SIZE,
    fill,
    stroke,
    strokeWidth,
    ...circleProps
}: SquareImageProps): React.ReactElement {
    const posX = useUnitMeasure(x, 'x');
    const posY = useUnitMeasure(y, 'x');
    const radius = useUnitMeasure(width, 'x');

    return (
        <Image
            x={posX}
            y={posY}
            width={radius}
            height={radius}
            {...circleProps}
        />
    );
}

import React from 'react';
import { Image } from 'react-konva';
import { useUnitMeasure } from '../../../../../../hooks';

type ImageProps = React.ComponentProps<typeof Image>;
type Props = Omit<ImageProps, 'x' | 'y' | 'width'> & {
    x: number;
    y: number;
    width: number;
};

export default function CollectedPoint(_props: Props): React.ReactElement {
    const { x, y, width, height, ...props } = _props;

    const posX = useUnitMeasure(x, 'x');
    const posY = useUnitMeasure(y, 'y');
    const _width = useUnitMeasure(width, 'x');

    return (
        <Image
            x={posX}
            y={posY}
            width={_width}
            height={_width}
            {...(props as ImageProps)}
        />
    );
}

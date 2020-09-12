import React, { ReactElement } from 'react';
import { Image } from 'react-konva';
import { useUnitMeasure } from '../../../../../../hooks';

type Props = Pick<React.ComponentProps<typeof Image>, 'image'> & {
    x: number;
    y: number;
    height: number;
};

export default function Point(props: Props): ReactElement {
    const { x, y, height, ..._props } = props;
    const _x = useUnitMeasure(x, 'x');
    const _y = useUnitMeasure(y, 'y');
    const _height = useUnitMeasure(height, 'y');

    return <Image x={_x} y={_y} height={_height} width={_height} {..._props} />;
}

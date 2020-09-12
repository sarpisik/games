import React from 'react';
import { useUnitMeasure } from '../../../../../../hooks';
import { Label } from '../../../../../Label';

interface Props {
    score: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function Score(props: Props): React.ReactElement {
    const { score, x, y, width, height } = props;

    const _x = useUnitMeasure(x, 'x');
    const _y = useUnitMeasure(y, 'y');
    const _width = useUnitMeasure(width, 'y');
    const _height = useUnitMeasure(height, 'y');

    return (
        <Label
            x={_x}
            y={_y}
            width={_width}
            height={_height}
            fill="#ffffff"
            align="center"
            verticalAlign="middle"
            text={score.toString()}
        />
    );
}

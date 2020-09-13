import React from 'react';
import { SIDEBAR_FONT_SIZE } from '../../../../../../../../../../config';
import { shortenString } from '../../../../../../../../../../utils';
import { useUnitMeasure } from '../../../../../../hooks';
import { Label } from '../../../../../Label';

interface Props {
    name?: string;
    x: number;
    y: number;
    offsetY: number;
    height: number;
}

export default function Name(props: Props): React.ReactElement {
    const { name = '', x, y, offsetY, height } = props;

    const _name = shortenString(name);
    const _x = useUnitMeasure(x, 'x');
    const _y = useUnitMeasure(y, 'y');
    const _offsetY = useUnitMeasure(offsetY, 'y');
    const _height = useUnitMeasure(height, 'y');

    return (
        <Label
            x={_x}
            y={_y}
            offsetY={_offsetY}
            height={_height}
            fill="#ffffff"
            align="center"
            verticalAlign="top"
            text={_name}
            fontSize={SIDEBAR_FONT_SIZE}
        />
    );
}

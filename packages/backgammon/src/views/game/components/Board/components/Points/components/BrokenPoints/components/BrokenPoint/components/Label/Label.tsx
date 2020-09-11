import React from 'react';
import { Text } from 'react-konva';
import { useUnitMeasure } from '../../../../../../../../hooks';

type TextProps = React.ComponentProps<typeof Text>;
export interface LabelProps extends Omit<TextProps, 'fill'> {
    color: TextProps['fill'];
}

export default function Label(props: LabelProps): React.ReactElement {
    const { color, x, y, width, ...rest } = props;

    const posX = useUnitMeasure(x, 'x');
    const posY = useUnitMeasure(y, 'y');
    const _width = useUnitMeasure(width, 'x');

    return (
        <React.Fragment>
            <Text
                x={posX}
                y={posY}
                width={_width}
                height={_width}
                fill={color}
                fontSize={20}
                align="center"
                verticalAlign="middle"
                {...rest}
            />
        </React.Fragment>
    );
}

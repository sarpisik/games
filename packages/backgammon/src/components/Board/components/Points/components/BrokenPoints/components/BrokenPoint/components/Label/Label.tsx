import React from 'react';
import { Text, Rect } from 'react-konva';
import { useUnitMeasure } from '../../../../../../../../hooks';

type TextProps = React.ComponentProps<typeof Text>;
type RectProps = React.ComponentProps<typeof Rect>;
export interface LabelProps extends Omit<TextProps, 'fill'> {
    color: TextProps['fill'];
    background: Omit<RectProps, 'fill'> & { color: string };
}

export default function Label(props: LabelProps): React.ReactElement {
    const {
        color,
        x,
        y,
        background: {
            color: bgColor,
            x: rectX,
            y: rectY,
            height,
            width,
            ...background
        },
        ...rest
    } = props;
    const posX = useUnitMeasure(x);
    const posY = useUnitMeasure(y);
    const posRectX = useUnitMeasure(rectX);
    const posRectY = useUnitMeasure(rectY);
    const rectHeight = useUnitMeasure(height);
    const rectWidth = useUnitMeasure(width);

    return (
        <React.Fragment>
            <Rect
                x={posRectX}
                y={posRectY}
                fill={bgColor}
                height={rectHeight}
                width={rectWidth}
                {...background}
            />
            <Text x={posX} y={posY} fill={color} fontSize={20} {...rest} />
        </React.Fragment>
    );
}

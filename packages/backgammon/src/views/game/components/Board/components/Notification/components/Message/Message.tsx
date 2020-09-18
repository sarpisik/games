import React from 'react';
import { Rect } from 'react-konva';
import { Label } from '../../../Label';
import { withUnitMeasure } from '../../../Sidebar/components/withUnitMeasure';

interface Props extends Pick<React.ComponentProps<typeof Label>, 'text'> {
    x: number;
    y: number;
    height: number;
    width: number;
}

export default withUnitMeasure(Message);

function Message(_props: Props): React.ReactElement | null {
    const { text, ...props } = _props;
    return (
        <React.Fragment>
            <Rect fill="rgba(0,0,0,0.5)" {...props} />
            <Label
                fill="#ffffff"
                align="center"
                verticalAlign="middle"
                text={text}
                {...props}
            />
        </React.Fragment>
    );
}

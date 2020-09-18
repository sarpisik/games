import React from 'react';
import { Image } from 'react-konva';
import { SIDEBAR_FONT_SIZE } from '../../../../../../../../../../../configs';
import { Label } from '../../../../../../Label';
import { withUnitMeasure } from '../../../../withUnitMeasure';

interface Props
    extends Pick<React.ComponentProps<typeof Label>, 'text' | 'onClick'> {
    image: Exclude<React.ComponentProps<typeof Image>['image'], undefined>;
    x: number;
    y: number;
    width: number;
    height: number;
}

export default withUnitMeasure(Button);

function Button(_props: Props): React.ReactElement {
    const { image, text, ...props } = _props;

    return (
        <React.Fragment>
            <Image image={image} onTap={props.onClick} {...props} />
            <Label
                fill="#ffffff"
                align="center"
                verticalAlign="middle"
                text={text}
                fontSize={SIDEBAR_FONT_SIZE}
                onTap={props.onClick}
                {...props}
            />
        </React.Fragment>
    );
}

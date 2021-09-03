import React from 'react';
import { Image } from 'react-konva';
import { OFFSETS } from '../../../../../../../../../../../configs';
import { SquareImage } from '../../../../../../shared';
import { withUnitMeasure } from '../../../../withUnitMeasure';

type ImageProps = React.ComponentProps<typeof Image>;

type ImageType = Exclude<ImageProps['image'], undefined>;

interface Props {
    bg: ImageType;
    icon: ImageType;
    onClick: () => void;
    disabled?: boolean;
    offsetIndex: keyof typeof OFFSETS.BTN;
}

// @ts-ignore
const EnhancedImage = withUnitMeasure<ImageProps>(Image);

export default function Button(_props: Props): React.ReactElement {
    const { bg, icon, disabled, onClick, offsetIndex } = _props;
    const _onClick: ImageProps['onClick'] = () => {
        disabled || onClick();
    };

    return (
        <React.Fragment>
            <EnhancedImage
                image={bg}
                onTap={_onClick}
                onClick={_onClick}
                {...OFFSETS.BTN[offsetIndex].bg}
            />
            <SquareImage
                image={icon}
                onTap={_onClick}
                onClick={_onClick}
                {...OFFSETS.BTN[offsetIndex].icon}
            />
        </React.Fragment>
    );
}

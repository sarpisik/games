import React from 'react';
import { OFFSETS } from '../../../../../../../../configs';
import { Label } from '../../../Label';
import { Overlay } from '../../../shared';
import {
    Props,
    withUnitMeasure,
} from '../../../Sidebar/components/withUnitMeasure';

type LabelProps = Pick<React.ComponentProps<typeof Label>, 'text'>;
type SmallNotificationProps = LabelProps & Props;

const { NOTIFICATION } = OFFSETS;

function SmallNotification(
    _props: SmallNotificationProps
): React.ReactElement | null {
    const { text, ...props } = _props;

    return (
        <React.Fragment>
            <Overlay {...props} />
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

const EnhancedSmallNotification = withUnitMeasure(SmallNotification);

export default (props: LabelProps) => (
    <EnhancedSmallNotification {...props} {...NOTIFICATION} />
);

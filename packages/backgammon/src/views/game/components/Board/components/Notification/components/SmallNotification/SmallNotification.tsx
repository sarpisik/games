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

const EnhancedLabel = withUnitMeasure<SmallNotificationProps>(Label);

export default function SmallNotification(
    _props: LabelProps
): React.ReactElement | null {
    const { text, ...props } = _props;

    return (
        <React.Fragment>
            <Overlay {...props} {...NOTIFICATION.small} />
            <EnhancedLabel
                // @ts-ignore
                fill="#ffffff"
                align="center"
                verticalAlign="middle"
                text={text}
                {...props}
                {...NOTIFICATION.small}
            />
        </React.Fragment>
    );
}

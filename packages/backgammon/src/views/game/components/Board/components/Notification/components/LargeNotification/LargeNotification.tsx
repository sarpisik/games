import React from 'react';
import { OFFSETS } from '../../../../../../../../configs';
import { Overlay, SquareImage } from '../../../shared';
import { Spinner } from './components';

type LargeNotificationProps = Pick<
    React.ComponentProps<typeof SquareImage>,
    'image'
>;

const { overlays } = OFFSETS.NOTIFICATION;

export default function LargeNotification(
    props: LargeNotificationProps
): React.ReactElement {
    return (
        <React.Fragment>
            <Overlay {...overlays.large} />
            <Spinner {...props} />
        </React.Fragment>
    );
}

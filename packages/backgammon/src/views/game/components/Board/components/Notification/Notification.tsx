import React from 'react';
import { useNotification } from '../../../../../../app/slices';
import { SmallNotification, LargeNotification } from './components';

export default function Notification(
    props: React.ComponentProps<typeof LargeNotification>
): React.ReactElement | null {
    const notification = useNotification();
    const { type, message } = notification;

    const shouldOverlay = type && message;

    if (shouldOverlay)
        return type === 'LARGE_NOTIFICATION' ? (
            <LargeNotification {...props} />
        ) : (
            <SmallNotification text={message} />
        );

    return null;
}

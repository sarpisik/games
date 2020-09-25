import React from 'react';
import { useNotification } from '../../../../../../app/slices';
import { SmallNotification } from './components';

export default function Notification(): React.ReactElement | null {
    const notification = useNotification();
    const { type, message } = notification;

    const shouldOverlay = type && message;

    return shouldOverlay ? <SmallNotification text={message} /> : null;
}

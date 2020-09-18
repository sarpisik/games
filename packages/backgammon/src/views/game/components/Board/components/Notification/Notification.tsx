import React from 'react';
import { useNotification } from '../../../../../../app/slices';
import { OFFSETS } from '../../../../../../configs';
import { Message } from './components';

const { NOTIFICATION } = OFFSETS;

export default function Notification(): React.ReactElement | null {
    const notification = useNotification();
    const { type, message } = notification;

    const shouldOverlay = type && message;

    return shouldOverlay ? <Message text={message} {...NOTIFICATION} /> : null;
}

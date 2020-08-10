import React from 'react';
import { useNotification } from '../../../../../../app/slices';
import { Basement, Label } from './components';

export default function Notification(): React.ReactElement | null {
    const notification = useNotification();
    const { type, message } = notification;

    const shouldOverlay = type && message;

    return shouldOverlay ? (
        <React.Fragment>
            <Basement />
            <Label text={message} />
        </React.Fragment>
    ) : null;
}

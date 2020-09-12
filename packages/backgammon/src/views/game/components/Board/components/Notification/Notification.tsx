import React from 'react';
import { useNotification, useSizes } from '../../../../../../app/slices';
import { Label } from '../Label';
import { Basement } from './components';

export default function Notification(): React.ReactElement | null {
    const sizes = useSizes();
    const { BOARD_WIDTH, BOARD_HEIGHT } = sizes;

    const notification = useNotification();
    const { type, message } = notification;

    const shouldOverlay = type && message;

    return shouldOverlay ? (
        <React.Fragment>
            <Basement />
            <Label
                width={BOARD_WIDTH}
                height={BOARD_HEIGHT}
                fill="#ffffff"
                align="center"
                verticalAlign="middle"
                text={message}
            />
        </React.Fragment>
    ) : null;
}

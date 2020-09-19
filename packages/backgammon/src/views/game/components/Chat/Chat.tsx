import React from 'react';
import { NewMessage, Messages } from './components';

export default function Chat(): React.ReactElement {
    return (
        <div className="d-flex flex-column h-100">
            <Messages />
            <NewMessage />
        </div>
    );
}

import React from 'react';
import { useGame } from '../../../../app/slices';
import { Message, NewMessage } from './components';

export default function Chat(): React.ReactElement {
    const { game } = useGame();

    return (
        <div className="d-flex flex-column h-100">
            <div className="flex-grow-1 overflow-auto">
                {game.chat.messages.map(Message)}
            </div>
            <NewMessage />
        </div>
    );
}

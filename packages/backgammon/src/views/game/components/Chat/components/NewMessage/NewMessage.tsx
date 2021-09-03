import React from 'react';
import { useDispatch } from 'react-redux';
import { EmitMessage, GAME_EVENTS } from 'types/lib/game';
import { useGame } from '../../../../../../app/slices';
import { Form } from './components';

export default function NewMessage(): React.ReactElement {
    const { game } = useGame();
    const dispatch = useDispatch();

    const disabled = game.chat.status === 'SENDING';

    const send = (message: EmitMessage['message']) => {
        // ID will be set by socket middleware.
        const payload: Omit<EmitMessage, 'id'> = { message };

        dispatch({ type: GAME_EVENTS.MESSAGE, payload });
    };

    return <Form disabled={disabled} onSubmit={send} />;
}

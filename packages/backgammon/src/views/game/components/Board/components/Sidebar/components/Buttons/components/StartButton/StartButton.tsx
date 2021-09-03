import React from 'react';
import { useDispatch } from 'react-redux';
import { GAME_EVENTS } from 'types/lib/game';
import { Button } from '../shared';

export default function StartButton(
    props: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'offsetIndex'>
): React.ReactElement {
    const [disabled, setDisabled] = React.useState(false);
    const dispatch = useDispatch();

    const startGame = () => {
        setDisabled(true);
        // User is a player and already sit.
        // So just dispatch start game event.
        dispatch({ type: GAME_EVENTS.START_GAME });
    };

    return (
        <Button
            disabled={disabled}
            onClick={startGame}
            offsetIndex={1}
            {...props}
        />
    );
}

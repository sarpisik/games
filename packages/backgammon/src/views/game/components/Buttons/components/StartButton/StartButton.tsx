import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { GAME_EVENTS } from 'types/lib/game';

export default function StartButton(
    _props: React.ComponentProps<typeof Button>
): React.ReactElement {
    const { children, ...props } = _props;
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
            variant="primary"
            {...props}
        >
            {disabled ? 'Waiting for the opponent' : children}
        </Button>
    );
}

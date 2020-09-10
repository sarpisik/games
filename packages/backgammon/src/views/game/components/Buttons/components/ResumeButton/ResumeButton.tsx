import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { EmitGameStart, PLAYERS } from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import { useGame, useUser } from '../../../../../../app/slices';

export default function ResumeButton(
    _props: React.ComponentProps<typeof Button>
): React.ReactElement {
    const { children, ...props } = _props;
    const [disabled, setDisabled] = React.useState(false);
    const { user } = useUser();
    const { game } = useGame();
    const dispatch = useDispatch();

    const resumeGame = () => {
        setDisabled(true);
        const playerIndex = game.players[PLAYERS.BLACK]
            ? PLAYERS.WHITE
            : PLAYERS.BLACK;
        const players = { [playerIndex]: user };
        const payload: EmitGameStart = Object.assign({}, game.players, players);
        // User is a player and already sit.
        // So just dispatch start game event.
        dispatch({ type: GAME_EVENTS.START_GAME, payload });
    };

    return (
        <Button
            disabled={disabled}
            onClick={resumeGame}
            variant="warning"
            {...props}
        >
            {disabled ? 'Please wait...' : 'Resume'}
        </Button>
    );
}

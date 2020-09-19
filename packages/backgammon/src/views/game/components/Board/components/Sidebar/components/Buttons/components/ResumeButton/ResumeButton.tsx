import React from 'react';
import { useDispatch } from 'react-redux';
import { EmitGameStart, PLAYERS } from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import { useGame, useUser } from '../../../../../../../../../../app/slices';
import { Button } from '../shared';

export default function ResumeButton(
    props: Omit<React.ComponentProps<typeof Button>, 'text'>
): React.ReactElement {
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
            text={disabled ? 'Please wait...' : 'Resume'}
            onClick={resumeGame}
            fill="#000000"
            {...props}
        />
    );
}

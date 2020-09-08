import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { PLAYERS } from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import { useGame, useUser } from '../../../../app/slices';

export default function RestartGame() {
    const dispatch = useDispatch();
    const { game } = useGame();
    const { user } = useUser();

    const { players, status } = game;
    const gameOver = status === 'OVER';
    const playersFull = Object.values(players).every(Boolean);
    const gamePlayer =
        players?.[PLAYERS.BLACK]?.id === user.id ||
        players?.[PLAYERS.WHITE]?.id === user.id;
    const shouldRender = playersFull && gamePlayer;

    const restartGame = () => {
        if (gamePlayer) {
            const payload =
                players?.[PLAYERS.BLACK]?.id === user.id
                    ? PLAYERS.BLACK
                    : PLAYERS.WHITE;
            dispatch({ type: GAME_EVENTS.RESTART_GAME, payload });
        } else {
            console.error('User is not a player to request restart game.');
        }
    };

    const handleClick = () => {
        gameOver ? restartGame() : alert('Not initialized yet.');
    };

    return shouldRender ? (
        <Button onClick={handleClick} variant="primary">
            {gameOver ? 'Restart Game' : 'Surrender'}
        </Button>
    ) : null;
}

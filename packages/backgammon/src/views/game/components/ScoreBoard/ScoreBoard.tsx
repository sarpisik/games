import React from 'react';
import { PLAYERS } from 'types/lib/backgammon';
import { useGame } from '../../../../app/slices';

export default function ScoreBoard(): React.ReactElement {
    const { game } = useGame();

    return (
        <React.Fragment>
            <p>Score: </p>
            <p>BLACK: {game.score[PLAYERS.BLACK]}</p>
            <p>WHITE: {game.score[PLAYERS.WHITE]}</p>
        </React.Fragment>
    );
}

import React from 'react';
import { Board, ScoreBoard, Undo } from './components';
import { useInitializeGame } from './hooks';

export default function Game() {
    useInitializeGame();

    return (
        <div className="Game">
            <Board />
            <ScoreBoard />
            <Undo />
        </div>
    );
}

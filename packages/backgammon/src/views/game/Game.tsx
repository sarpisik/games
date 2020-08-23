import React from 'react';
import { Board, ScoreBoard, Undo } from './components';
import { useInitializeGame, useDynamicLayout } from './hooks';

export default function Game() {
    useInitializeGame();
    useDynamicLayout();

    return (
        <div className="Game">
            <Board />
            <ScoreBoard />
            <Undo />
        </div>
    );
}

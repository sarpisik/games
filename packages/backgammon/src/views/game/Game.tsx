import React from 'react';
import { Board, ScoreBoard, Sidebar, Undo, Timer } from './components';
import { useDynamicLayout, useInitializeGame } from './hooks';

export default function Game() {
    useInitializeGame();
    useDynamicLayout();

    return (
        <div className="Game">
            <Board />
            <Sidebar>
                <ScoreBoard />
                <Timer />
                <Undo />
            </Sidebar>
        </div>
    );
}

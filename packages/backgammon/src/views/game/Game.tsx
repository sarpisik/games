import React from 'react';
import { Board, ScoreBoard, Sidebar, Undo } from './components';
import { useDynamicLayout, useInitializeGame } from './hooks';

export default function Game() {
    useInitializeGame();
    useDynamicLayout();

    return (
        <div className="Game">
            <Board />
            <Sidebar>
                <ScoreBoard />
                <Undo />
            </Sidebar>
        </div>
    );
}

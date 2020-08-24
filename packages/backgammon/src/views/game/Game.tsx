import React from 'react';
import {
    Board,
    RoundBoard,
    Sidebar,
    Timer,
    Undo,
    ScoreBoard,
} from './components';
import { useDynamicLayout, useInitializeGame } from './hooks';

export default function Game() {
    useInitializeGame();
    useDynamicLayout();

    return (
        <div className="Game">
            <Board />
            <Sidebar>
                <ScoreBoard />
                <hr />
                <RoundBoard />
                <hr />
                <Timer />
                <hr />
                <Undo />
            </Sidebar>
        </div>
    );
}

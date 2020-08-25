import React from 'react';
import {
    Board,
    RoundBoard,
    ScoreBoard,
    Sidebar,
    Timer,
    Undo,
} from './components';
import { useDynamicLayout } from './hooks';

export default function Game() {
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

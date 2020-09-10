import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withAuthorization } from '../../components';
import {
    Board,
    Buttons,
    RoundBoard,
    ScoreBoard,
    Sidebar,
    Timer,
    Undo,
    withGameConnection,
} from './components';
import { useDynamicLayout, useResetGame } from './hooks';

export default withAuthorization(withGameConnection(Game));

function Game(_props: RouteComponentProps) {
    useResetGame();
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
                <hr />
                <Buttons />
            </Sidebar>
        </div>
    );
}

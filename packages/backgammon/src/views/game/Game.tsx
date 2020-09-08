import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withAuthorization } from '../../components';
import {
    Board,
    RoundBoard,
    ScoreBoard,
    Sidebar,
    Timer,
    Undo,
    withGameConnection,
    RestartGame,
} from './components';
import { useDynamicLayout } from './hooks';

export default withAuthorization(withGameConnection(Game));

function Game(_props: RouteComponentProps) {
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
                <RestartGame />
            </Sidebar>
        </div>
    );
}

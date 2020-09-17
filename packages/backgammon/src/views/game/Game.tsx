import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withAuthorization } from '../../components';
import {
    Board,
    Buttons,
    Chat,
    RoundBoard,
    ScoreBoard,
    Sidebar,
    Timer,
    Undo,
    withGameConnection,
} from './components';
import { useDynamicLayout, useResetGame } from './hooks';

export default withAuthorization(withGameConnection(Game));

export function Game(_props: RouteComponentProps) {
    useResetGame();
    const orientation = useDynamicLayout();
    const className = 'align-items-center d-flex h-100 justify-content-center bg-dark overflow-auto'.concat(
        orientation === 'portrait' ? ' flex-wrap' : ''
    );

    return (
        <div className={className}>
            <Board />
            <Sidebar>
                <Chat />
                {/* <ScoreBoard />
                <hr />
                <RoundBoard />
                <hr />
                <Timer />
                <hr />
                <Undo />
                <hr />
                <Buttons /> */}
            </Sidebar>
        </div>
    );
}

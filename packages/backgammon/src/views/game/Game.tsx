import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withAuthorization, withLocaleSwitch } from '../../components';
import { Board, Chat, Sidebar, withGameConnection } from './components';
import { useDynamicLayout, useResetGame } from './hooks';

export default withLocaleSwitch(withAuthorization(withGameConnection(Game)));

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
            </Sidebar>
        </div>
    );
}

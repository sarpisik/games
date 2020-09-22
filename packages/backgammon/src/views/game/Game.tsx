import React from 'react';
import {
    LayoutWrapperProps,
    withAuthorization,
    withLayout,
    withLocaleSwitch,
} from '../../components';
import { Board, Chat, Sidebar, withGameConnection } from './components';
import { useDynamicClassName, useResetGame } from './hooks';

export const Game = withLayout({
    className:
        'align-items-center d-flex justify-content-center bg-dark overflow-auto',
    fluid: true,
})(_Game);

export default withLocaleSwitch(withAuthorization(withGameConnection(Game)));

function _Game(props: LayoutWrapperProps) {
    useResetGame();
    useDynamicClassName(props.setClassName);

    return (
        <React.Fragment>
            <Board />
            <Sidebar>
                <Chat />
            </Sidebar>
        </React.Fragment>
    );
}

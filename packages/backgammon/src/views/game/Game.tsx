import React from 'react';
import { useDispatch } from 'react-redux';

import { Board, ScoreBoard, Undo } from './components';

import { SOCKET_ACTIONS } from '../../app/middlewares/socket/actions';

export default function Game() {
    const dispatch = useDispatch();

    React.useEffect(
        function connectSocket() {
            dispatch({ type: SOCKET_ACTIONS.CONNECT });
            // dispatch({ type: EVENTS.INITIAL_GAME });

            return () => {
                dispatch({ type: SOCKET_ACTIONS.DISCONNECT });
            };
        },
        [dispatch]
    );

    return (
        <div className="Game">
            <Board />
            <ScoreBoard />
            <Undo />
        </div>
    );
}

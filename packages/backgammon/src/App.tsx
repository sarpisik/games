import React from 'react';
import { useDispatch } from 'react-redux';
import { EVENTS } from 'types/lib/backgammon';
import { SOCKET_ACTIONS } from './app/middlewares/socket/actions';
import { Board, ScoreBoard, Undo } from './components';

/*
 * TODO:
 * - [x]render broken points.
 * - [x]calculate double dice. e.g 3-3
 * - [x]calculate the movement availability before draggable
 *   and skip the round on invalid.
 * - []calculate when game finishes.
 * - []highlight available triangles on drag move.
 */

function App() {
    const dispatch = useDispatch();

    React.useEffect(
        function connectSocket() {
            dispatch({ type: SOCKET_ACTIONS.CONNECT });
            dispatch({ type: EVENTS.INITIAL_GAME });

            return () => {
                dispatch({ type: SOCKET_ACTIONS.DISCONNECT });
            };
        },
        [dispatch]
    );

    return (
        <div className="App">
            <Board />
            <ScoreBoard />
            <Undo />
        </div>
    );
}

export default App;

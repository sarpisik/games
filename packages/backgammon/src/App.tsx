import React from 'react';
import { useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { setGame } from './app/slices';
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
            const socket = socketIOClient(
                process.env.REACT_APP_SOCKET_URL as string
            );
            socket.on(
                'initialGame',
                (initialGame: Parameters<typeof setGame>[0]) => {
                    dispatch(setGame(initialGame));
                }
            );
            socket.on('message', console.log);

            return () => {
                socket.disconnect();
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

import React from 'react';
import socketIOClient from 'socket.io-client';
import { useRound } from './app/slices';
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
    const [, dsp] = useRound();

    React.useEffect(function connectSocket() {
        const socket = socketIOClient(
            process.env.REACT_APP_SOCKET_URL as string
        );
        socket.on('message', console.log);
    }, []);

    React.useEffect(function startAppOnMounted() {
        dsp.setInitialRound();

        // skip static dep dispatch
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Board />
            <ScoreBoard />
            <Undo />
        </div>
    );
}

export default App;

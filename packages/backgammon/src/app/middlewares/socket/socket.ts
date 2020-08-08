import { Middleware } from '@reduxjs/toolkit';
import socketIOClient from 'socket.io-client';
import { SOCKET_ACTIONS } from './actions';
import { EVENTS } from 'types/lib/backgammon';
import { setGame, addRound } from '../../slices';
import { store } from '../../store';

type SocketContextType = ReturnType<typeof socketIOClient> | null;

const socket: () => Middleware = () => {
    let connection: SocketContextType = null;

    const onInitGame = (s: typeof store) => (
        initialGame: Parameters<typeof setGame>[0]
    ) => {
        s.dispatch(setGame(initialGame));
    };

    const onRound = (s: typeof store) => (
        round: Parameters<typeof addRound>[0]
    ) => {
        s.dispatch(addRound(round));
    };

    return (store) => (next) => (action) => {
        switch (action.type) {
            case SOCKET_ACTIONS.CONNECT:
                if (connection !== null) connection.disconnect();
                connection = socketIOClient(
                    process.env.REACT_APP_SOCKET_URL as string
                );
                // @ts-ignore
                connection.on(EVENTS.INITIAL_GAME, onInitGame(store));
                // @ts-ignore
                connection.on(EVENTS.ROUND, onRound(store));
                break;

            case SOCKET_ACTIONS.DISCONNECT:
                if (connection !== null) connection.disconnect();
                connection = null;
                break;

            case EVENTS.INITIAL_GAME:
                connection?.emit(EVENTS.INITIAL_GAME);
                break;

            case EVENTS.ROUND:
                connection?.emit(EVENTS.ROUND, action.payload);
                break;

            default:
                if (typeof action === 'function') {
                    action(store.dispatch, store.getState);
                } else {
                    next(action);
                }

                break;
        }
    };
};

export default socket();

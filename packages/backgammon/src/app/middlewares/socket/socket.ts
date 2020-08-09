import { Middleware } from '@reduxjs/toolkit';
import socketIOClient from 'socket.io-client';
import { SOCKET_ACTIONS } from './actions';
import { EVENTS } from 'types/lib/backgammon';
import {
    setGame,
    addRound,
    setNotification,
    deleteNotification,
    undoRound,
} from '../../slices';
import { store } from '../../store';

type SocketContextType = ReturnType<typeof socketIOClient> | null;
type InitialGame = Parameters<typeof setGame>[0];
type AddRound = Parameters<typeof addRound>[0];
type UndoRound = Parameters<typeof undoRound>[0];

const socket: () => Middleware = () => {
    let connection: SocketContextType = null;

    const onInitGame = (s: typeof store) => (initialGame: InitialGame) => {
        s.dispatch(setGame(initialGame));
    };

    const onUndoRound = (s: typeof store) => (rounds: UndoRound) => {
        s.dispatch(undoRound(rounds));
    };

    const onRound = (s: typeof store) => (round: AddRound) => {
        const state = s.getState();
        const { notification } = state;
        const { type, message } = notification;

        const shouldDeleteNotification = type && message;
        shouldDeleteNotification && s.dispatch(deleteNotification());

        s.dispatch(addRound(round));
    };

    const onSkipRound = (s: typeof store) => ({
        round,
        message,
    }: {
        round: AddRound;
        message: Parameters<typeof setNotification>[0]['message'];
    }) => {
        s.dispatch(setNotification({ type: EVENTS.SKIP_ROUND, message }));
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
                // @ts-ignore
                connection.on(EVENTS.SKIP_ROUND, onSkipRound(store));
                // @ts-ignore
                connection.on(EVENTS.UNDO_ROUND, onUndoRound(store));
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

            case EVENTS.BROKEN_POINT_ROUND:
                connection?.emit(EVENTS.BROKEN_POINT_ROUND, action.payload);
                break;

            case EVENTS.UNDO_ROUND:
                connection?.emit(EVENTS.UNDO_ROUND, action.payload);
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

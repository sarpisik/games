import { Middleware } from '@reduxjs/toolkit';
import socketIOClient from 'socket.io-client';
import {
    EVENTS,
    EmitGameOver,
    PLAYERS,
    EmitSignInUser,
    EmitStageOver,
    User,
} from 'types/lib/backgammon';
import {
    addRound,
    deleteNotification,
    setGame,
    setNotification,
    undoRound,
    replaceRound,
    deleteRounds,
    signIn,
} from '../../slices';
import { store } from '../../store';
import { SOCKET_ACTIONS } from './actions';

type SocketContextType = ReturnType<typeof socketIOClient> | null;
type Game = Parameters<typeof setGame>[0];
type AddRound = Parameters<typeof addRound>[0];
type ReplaceRound = Parameters<typeof replaceRound>[0];
type UndoRound = Parameters<typeof undoRound>[0];

const REACT_APP_SOCKET_URL = process.env.REACT_APP_SOCKET_URL as string;

const socket: () => Middleware = () => {
    let connection: SocketContextType = null;

    const onUpdateGame = (s: typeof store) => (game: Game) => {
        s.dispatch(setGame(game));
    };

    const onUndoRound = (s: typeof store) => (rounds: UndoRound) => {
        s.dispatch(undoRound(rounds));
    };

    const onReplaceRound = (s: typeof store) => (round: ReplaceRound) => {
        s.dispatch(replaceRound(round));
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

    const onStageOver = (s: typeof store) => (data: EmitStageOver) => {
        const { game, user } = s.getState();
        const message = createWinnerMessage(game, user, data).concat(
            ' Preparing the next stage.'
        );

        s.dispatch(setNotification({ type: EVENTS.STAGE_OVER, message }));
        s.dispatch(deleteRounds());
    };

    const onGameOver = (s: typeof store) => (data: EmitGameOver) => {
        const { game, user } = s.getState();
        const message = createWinnerMessage(game, user, data);

        s.dispatch(setNotification({ type: EVENTS.GAME_OVER, message }));
        s.dispatch(deleteRounds());
    };

    return (store) => (next) => (action) => {
        if (typeof action === 'function') {
            action(store.dispatch, store.getState);
        } else {
            switch (action.type) {
                case EVENTS.JOIN_ROOM:
                    if (connection !== null) connection.disconnect();
                    connection = socketIOClient(REACT_APP_SOCKET_URL);
                    connection.emit(EVENTS.JOIN_ROOM, action.payload);
                    // @ts-ignore
                    connection.on(EVENTS.GAME_UPDATE, onUpdateGame(store));
                    // @ts-ignore
                    connection.on(EVENTS.ROUND, onRound(store));
                    // @ts-ignore
                    connection.on(EVENTS.SKIP_ROUND, onSkipRound(store));
                    // @ts-ignore
                    connection.on(EVENTS.UNDO_ROUND, onUndoRound(store));
                    // @ts-ignore
                    connection.on(EVENTS.STAGE_OVER, onStageOver(store));
                    // @ts-ignore
                    connection.on(EVENTS.GAME_OVER, onGameOver(store));
                    connection.on(
                        EVENTS.COLLECT_POINT_ROUND,
                        // @ts-ignore
                        onReplaceRound(store)
                    );
                    break;

                case SOCKET_ACTIONS.DISCONNECT:
                    if (connection !== null) connection.disconnect();
                    connection = null;
                    break;

                case EVENTS.SIGN_IN_USER:
                    {
                        const black = action.payload;
                        const { game } = store.getState();
                        const { id } = game;

                        signIn(black);
                        const players = Object.assign({}, game.players, {
                            [PLAYERS.BLACK]: black,
                        });

                        const data: EmitSignInUser = { id, players };

                        connection?.emit(EVENTS.SIGN_IN_USER, data);
                    }
                    break;

                case EVENTS.ROUND:
                    connection?.emit(EVENTS.ROUND, action.payload);
                    break;

                case EVENTS.BROKEN_POINT_ROUND:
                    connection?.emit(EVENTS.BROKEN_POINT_ROUND, action.payload);
                    break;

                case EVENTS.COLLECT_POINT_ROUND:
                    connection?.emit(
                        EVENTS.COLLECT_POINT_ROUND,
                        action.payload
                    );
                    break;

                case EVENTS.UNDO_ROUND:
                    connection?.emit(EVENTS.UNDO_ROUND, action.payload);
                    break;

                default:
                    next(action);

                    break;
            }
        }
    };
};

export default socket();

function createWinnerMessage(
    game: Game,
    user: User,
    data: EmitStageOver | EmitGameOver
): string {
    const { id } = user;
    const { players } = game;
    const { winner } = data;
    const shouldWinner = players[winner] === id;
    const message = shouldWinner ? 'Congratulations! You won!' : 'You lose!';

    return message;
}

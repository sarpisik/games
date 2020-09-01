import { Middleware } from '@reduxjs/toolkit';
import socketIOClient from 'socket.io-client';
import {
    EmitError,
    EmitGameOver,
    EmitScore,
    EmitStageOver,
    EVENTS,
    GameClient,
} from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import { EmitJoinRooms, OnEditGame, ROOM_EVENTS } from 'types/lib/room';
import { ROOMS_EVENTS } from 'types/lib/rooms';
import { ROUTES } from '../../../config';
import { history } from '../../../lib';
import { User } from '../../../types/user';
import {
    addRoomUser,
    addRound,
    deleteNotification,
    deleteRoomUser,
    deleteRounds,
    replaceRound,
    setConnectionStatus,
    setGame,
    setInitialGame,
    setNextStage,
    setNotification,
    setPlayers,
    setRoom,
    setRooms,
    setRoundPlayer,
    setShortTimer,
    setTimer,
    undoRound,
} from '../../slices';
import { CONNECTION_STATUS } from '../../slices/connection/connection';
import { FEEDBACK_STATUS, setFeedback } from '../../slices/feedbacks/feedbacks';
import { Room, setRoomGame } from '../../slices/room/room';
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

    const onSetRoundPlayer = (s: typeof store, round: AddRound) => {
        const state = s.getState();
        const { game, user } = state;

        s.dispatch(
            setRoundPlayer(
                calculateIsRoundPlayer(user.id, game.players, round.player)
            )
        );
    };

    const onGameEvent = (s: typeof store) => (action: {
        type: GAME_EVENTS;
        payload: unknown;
    }) => {
        // s.dispatch(setGame(game));
        console.log(action);
    };

    const onUpdateGame = (s: typeof store) => (game: Game) => {
        s.dispatch(setGame(game));
    };

    const onJoinRooms = (s: typeof store) => (roomIds: EmitJoinRooms) => {
        s.dispatch(setRooms(roomIds));
        s.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    };

    const onJoinRoom = (s: typeof store) => (payload: Room) => {
        s.dispatch(setRoom(payload));
        s.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    };

    const onJoinGame = (s: typeof store) => (payload: GameClient) => {
        s.dispatch(setInitialGame(payload));
        s.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    };

    const onPlayerDisconnect = (s: typeof store) => (
        players: GameClient['players']
    ) => {
        s.dispatch(setPlayers({ players }));
    };

    const onNewUser = (s: typeof store) => (payload: User) => {
        s.dispatch(addRoomUser(payload));
    };

    const onDeleteUser = (s: typeof store) => (payload: User['id']) => {
        s.dispatch(deleteRoomUser(payload));
    };

    const onEditGame = (s: typeof store) => (payload: OnEditGame) => {
        const user = s.getState().user;
        const { id } = user;
        const { roomId, ..._payload } = payload;

        // If we emited edit game, navigate.
        if (
            (Object.values(payload.players) as (User | null)[]).some(
                (player) => player?.id === id
            )
        ) {
            s.dispatch(
                setFeedback({
                    editRoomGame: { status: FEEDBACK_STATUS.SUCCESS },
                })
            );
            const path = `${ROUTES.ROOMS}/${roomId}/${_payload.id}`;
            history.push(path);
        }
        s.dispatch(setRoomGame(_payload));
    };

    const onTimer = (s: typeof store) => (game: Game['timer']) => {
        s.dispatch(setTimer(game));
    };

    const onShortTimer = (s: typeof store) => (seconds: number) => {
        s.dispatch(setShortTimer({ seconds }));
    };

    const onUndoRound = (s: typeof store) => (rounds: UndoRound) => {
        onSetRoundPlayer(s, rounds[rounds.length - 1]);
        s.dispatch(undoRound(rounds));
    };

    const onReplaceRound = (s: typeof store) => (round: ReplaceRound) => {
        onSetRoundPlayer(s, round);
        s.dispatch(replaceRound(round));
    };

    const onUserDisconnect = (s: typeof store) => (payload: string) => {
        console.log(`${payload} disconnected.`);
    };

    const onRound = (s: typeof store) => (round: AddRound) => {
        const dispatch = s.dispatch;
        const state = s.getState();
        const { notification } = state;
        const { type, message } = notification;

        const shouldDeleteNotification = type && message;
        shouldDeleteNotification && s.dispatch(deleteNotification());

        onSetRoundPlayer(s, round);
        dispatch(addRound(round));
    };

    const onSkipRound = (s: typeof store) => ({
        round,
        message,
    }: {
        round: AddRound;
        message: Parameters<typeof setNotification>[0]['message'];
    }) => {
        onSetRoundPlayer(s, round);
        s.dispatch(setNotification({ type: EVENTS.SKIP_ROUND, message }));
        s.dispatch(addRound(round));
    };

    const onError = (s: typeof store) => (data: EmitError) => {
        s.dispatch(setNotification(data));
    };

    const onStageOver = (s: typeof store) => (data: EmitScore) => {
        const { game, user } = s.getState();
        const message = createWinnerMessage(game, user, data).concat(
            ' Preparing the next stage.'
        );

        s.dispatch(setNotification({ type: EVENTS.STAGE_OVER, message }));
        s.dispatch(setNextStage(data));
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
                case ROOMS_EVENTS.JOIN_ROOMS:
                    if (connection !== null) connection.disconnect();
                    store.dispatch(
                        setConnectionStatus(CONNECTION_STATUS.CONNECTING)
                    );
                    connection = socketIOClient(action.payload);
                    // @ts-ignore
                    connection.on(ROOMS_EVENTS.JOIN_ROOMS, onJoinRooms(store));
                    break;

                case ROOM_EVENTS.JOIN_ROOM:
                    if (connection !== null) connection.disconnect();
                    store.dispatch(
                        setConnectionStatus(CONNECTION_STATUS.CONNECTING)
                    );
                    connection = socketIOClient(action.payload, {
                        query: { userId: store.getState().user?.id },
                    });
                    // @ts-ignore
                    connection.on(ROOM_EVENTS.JOIN_ROOM, onJoinRoom(store));
                    // @ts-ignore
                    connection.on(ROOM_EVENTS.NEW_USER, onNewUser(store));
                    connection.on(
                        ROOM_EVENTS.DISCONNECT_USER,
                        // @ts-ignore
                        onDeleteUser(store)
                    );
                    // @ts-ignore
                    connection.on(ROOM_EVENTS.EDIT_GAME, onEditGame(store));
                    break;

                case GAME_EVENTS.JOIN_GAME:
                    if (connection !== null) connection.disconnect();
                    store.dispatch(
                        setConnectionStatus(CONNECTION_STATUS.CONNECTING)
                    );
                    connection = socketIOClient(action.payload, {
                        query: { userId: store.getState().user?.id },
                    });
                    // @ts-ignore
                    connection.on(GAME_EVENTS.JOIN_GAME, onJoinGame(store));
                    connection.on(
                        GAME_EVENTS.DISCONNECT_PLAYER,
                        // @ts-ignore
                        onPlayerDisconnect(store)
                    );
                    connection.on(
                        GAME_EVENTS.DISCONNECT_USER,
                        // @ts-ignore
                        onUserDisconnect(store)
                    );
                    // @ts-ignore
                    connection.on(GAME_EVENTS.ERROR, onError(store));
                    // @ts-ignore
                    connection.on(GAME_EVENTS.TIMER, onTimer(store));
                    // @ts-ignore
                    connection.on(GAME_EVENTS.SHORT_TIMER, onShortTimer(store));
                    // @ts-ignore
                    connection.on(GAME_EVENTS.ROUND, onRound(store));
                    // @ts-ignore
                    connection.on(GAME_EVENTS.STAGE_OVER, onStageOver(store));
                    // @ts-ignore
                    connection.on(GAME_EVENTS.SKIP_ROUND, onSkipRound(store));
                    connection.on(
                        GAME_EVENTS.COLLECT_POINT_ROUND,
                        // @ts-ignore
                        onReplaceRound(store)
                    );
                    // @ts-ignore
                    connection.on(GAME_EVENTS.UNDO_ROUND, onUndoRound(store));
                    break;

                case GAME_EVENTS.INITIALIZE_GAME:
                    // @ts-ignore
                    connection.emit(GAME_EVENTS.INITIALIZE_GAME);
                    // @ts-ignore
                    connection.on(
                        GAME_EVENTS.INITIALIZE_GAME,
                        // @ts-ignore
                        onGameEvent(store)
                    );
                    // @ts-ignore
                    connection.on(GAME_EVENTS.ROUND, onRound(store));
                    break;

                case EVENTS.JOIN_ROOM:
                    if (connection !== null) connection.disconnect();
                    connection = socketIOClient(REACT_APP_SOCKET_URL);
                    connection.emit(EVENTS.JOIN_ROOM, action.payload);
                    // @ts-ignore
                    connection.on(EVENTS.GAME_UPDATE, onUpdateGame(store));
                    // @ts-ignore
                    connection.on(EVENTS.GAME_OVER, onGameOver(store));
                    break;

                case SOCKET_ACTIONS.DISCONNECT:
                    if (connection !== null) connection.disconnect();
                    connection = null;
                    break;

                /* ROOM EVENTS */
                case ROOM_EVENTS.EDIT_GAME:
                    // Display loading.
                    store.dispatch(
                        setFeedback({
                            editRoomGame: { status: FEEDBACK_STATUS.FETCHING },
                        })
                    );
                    connection?.emit(ROOM_EVENTS.EDIT_GAME, action.payload);
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
    const shouldWinner = players[winner]?.id === id;
    const message = shouldWinner ? 'Congratulations! You won!' : 'You lose!';

    return message;
}

function calculateIsRoundPlayer(
    userId: User['id'],
    gamePlayers: Game['players'],
    roundPlayerIndex: Game['rounds'][number]['player']
) {
    const roundPlayerId = gamePlayers[roundPlayerIndex]?.id;
    const isRoundPlayer = userId === roundPlayerId;

    return isRoundPlayer;
}

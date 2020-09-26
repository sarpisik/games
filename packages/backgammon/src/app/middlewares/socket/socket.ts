import { Middleware } from '@reduxjs/toolkit';
import socketIOClient from 'socket.io-client';
import { EmitGameStart, EmitScore, GameClient } from 'types/lib/backgammon';
import {
    ChatMessageServer,
    EmitMessage,
    EmitSurrender,
    GAME_EVENTS,
} from 'types/lib/game';
import { EmitJoinRooms, OnEditGame, ROOM_EVENTS } from 'types/lib/room';
import { ROOMS_EVENTS } from 'types/lib/rooms';
import { history } from '../../../lib';
import { User } from '../../../types/user';
import {
    addMessage,
    addRoomUser,
    addRound,
    deleteRoomUser,
    editChat,
    editGame,
    replaceRound,
    setConnectionStatus,
    setGame,
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
import { onJoinGame, onSurrender } from './thunks';
import {
    calculateIsRoundPlayer,
    withDeleteNotification,
    withNotification,
    withSpinner,
} from './utils';

type SocketContextType = ReturnType<typeof socketIOClient> | null;
type Game = Parameters<typeof setGame>[0];
type AddRound = Parameters<typeof addRound>[0];
type ReplaceRound = Parameters<typeof replaceRound>[0];
type UndoRound = Parameters<typeof undoRound>[0];

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

    const onJoinRooms = (s: typeof store) => (roomIds: EmitJoinRooms) => {
        s.dispatch(setRooms(roomIds));
        s.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    };

    const onJoinRoom = (s: typeof store) => (payload: Room) => {
        s.dispatch(setRoom(payload));
        s.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    };

    const onPlayerDisconnect = (s: typeof store) => (
        players: GameClient['players']
    ) => {
        s.dispatch(editGame({ players }));
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
            const path = `${roomId}/${_payload.id}`;
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

    const withTimer = (
        wrappedFunction: typeof onTimer | typeof onShortTimer
    ) => (s: typeof store) => (payload: any) => {
        s.dispatch(editGame({ _status: 'INITIALIZED' }));
        // @ts-ignore
        withDeleteNotification(wrappedFunction)(s)(payload);
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

        onSetRoundPlayer(s, round);
        dispatch(addRound(round));
    };

    const onSkipRound = (s: typeof store) => (round: AddRound) => {
        onSetRoundPlayer(s, round);
        s.dispatch(addRound(round));
    };

    const onStageOver = (s: typeof store) => (data: EmitScore) => {
        const { winner, ..._game } = data;
        // @ts-ignore
        s.dispatch(editGame(_game));
    };

    const onGameOver = (s: typeof store) => (data: EmitScore) => {
        const { winner, ..._game } = data;
        // Reset game
        // @ts-ignore
        s.dispatch(editGame(Object.assign(_game, { _status: 'OVER' })));
    };

    const onUserNotFoundChat = (s: typeof store) => (time: number) => {
        const { user } = s.getState();
        const message = `Error, could not send your message. Reason: user not found by id ${user.id}.`;

        s.dispatch(
            addMessage({
                status: 'ERROR',
                message: { name: user.name, message, time },
            })
        );
    };

    const onChatMessage = (s: typeof store) => (message: ChatMessageServer) => {
        s.dispatch(addMessage({ status: 'SUCCESS', message }));
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
                    connection.on(
                        'disconnect',
                        withNotification(GAME_EVENTS.DISCONNECT_FROM_SERVER)(
                            // @ts-ignore
                            store
                        )
                    );

                    connection.on(
                        GAME_EVENTS.JOIN_GAME,
                        onJoinGame(store.dispatch, store.getState, null)
                    );
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

                    connection.on(
                        GAME_EVENTS.ERROR,
                        // @ts-ignore
                        withNotification(GAME_EVENTS.ERROR)(store)
                    );
                    // @ts-ignore
                    connection.on(GAME_EVENTS.TIMER, withTimer(onTimer)(store));
                    connection.on(
                        GAME_EVENTS.SHORT_TIMER,
                        // @ts-ignore
                        withTimer(onShortTimer)(store)
                    );
                    connection.on(
                        GAME_EVENTS.ROUND,
                        // @ts-ignore
                        withDeleteNotification(onRound)(store)
                    );
                    connection.on(
                        GAME_EVENTS.STAGE_OVER,
                        withNotification(
                            GAME_EVENTS.STAGE_OVER,
                            onStageOver
                            // @ts-ignore
                        )(store)
                    );
                    connection.on(
                        GAME_EVENTS.SKIP_ROUND,
                        withNotification(
                            GAME_EVENTS.SKIP_ROUND,
                            onSkipRound
                            // @ts-ignore
                        )(store)
                    );
                    connection.on(
                        GAME_EVENTS.COLLECT_POINT_ROUND,
                        // @ts-ignore
                        withDeleteNotification(onReplaceRound)(store)
                    );
                    connection.on(
                        GAME_EVENTS.UNDO_ROUND,
                        // @ts-ignore
                        withDeleteNotification(onUndoRound)(store)
                    );
                    connection.on(
                        GAME_EVENTS.SURRENDER,
                        withDeleteNotification(
                            () =>
                                onSurrender(
                                    store.dispatch,
                                    store.getState,
                                    null
                                )
                            // @ts-ignore
                        )(store)
                    );
                    connection.on(
                        GAME_EVENTS.GAME_OVER,
                        withNotification(
                            GAME_EVENTS.GAME_OVER,
                            onGameOver
                            // @ts-ignore
                        )(store)
                    );
                    connection.on(
                        GAME_EVENTS.USER_NOT_FOUND_CHAT,
                        // @ts-ignore
                        onUserNotFoundChat(store)
                    );
                    connection.on(
                        GAME_EVENTS.MESSAGE,
                        // @ts-ignore
                        onChatMessage(store)
                    );
                    connection.on(
                        GAME_EVENTS.NOTIFICATION,
                        withNotification(GAME_EVENTS.NOTIFICATION)(
                            // @ts-ignore
                            store
                        )
                    );
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

                case GAME_EVENTS.ROUND:
                    connection?.emit(
                        GAME_EVENTS.ROUND,
                        withSpinner(action, store)
                    );
                    break;

                case GAME_EVENTS.BROKEN_POINT_ROUND:
                    connection?.emit(
                        GAME_EVENTS.BROKEN_POINT_ROUND,
                        withSpinner(action, store)
                    );
                    break;

                case GAME_EVENTS.COLLECT_POINT_ROUND:
                    connection?.emit(
                        GAME_EVENTS.COLLECT_POINT_ROUND,
                        withSpinner(action, store)
                    );
                    break;

                case GAME_EVENTS.UNDO_ROUND:
                    connection?.emit(action.type, withSpinner(action, store));
                    break;

                case GAME_EVENTS.START_GAME:
                case GAME_EVENTS.RESTART_GAME:
                    connection?.emit(
                        GAME_EVENTS.START_GAME,
                        action.payload ||
                            (store.getState().game.players as EmitGameStart)
                    );
                    break;

                case GAME_EVENTS.SURRENDER: {
                    // Inform the subscribed UI elements.
                    store.dispatch(editGame({ _status: 'SURRENDER' }));
                    connection?.emit(
                        action.type,
                        withSpinner(action.payload as EmitSurrender, store)
                    );
                    break;
                }

                case GAME_EVENTS.MESSAGE: {
                    const { payload } = action;

                    const user = store.getState().user;
                    payload.id = user.id;

                    // Inform the subscribed UI elements.
                    store.dispatch(editChat({ status: 'SENDING' }));

                    // Dispatch message
                    connection?.emit(
                        GAME_EVENTS.MESSAGE,
                        payload as EmitMessage
                    );
                    break;
                }

                default:
                    next(action);

                    break;
            }
        }
    };
};

export default socket();

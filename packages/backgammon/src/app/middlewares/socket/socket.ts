import { Middleware } from '@reduxjs/toolkit';
import socketIOClient from 'socket.io-client';
import { EmitGameStart } from 'types/lib/backgammon';
import { EmitMessage, GAME_EVENTS } from 'types/lib/game';
import { ROOM_EVENTS } from 'types/lib/room';
import { ROOMS_EVENTS } from 'types/lib/rooms';
import { editChat, editGame } from '../../slices';
import { FEEDBACK_STATUS, setFeedback } from '../../slices/feedbacks/feedbacks';
import { store as _store } from '../../store';
import { SOCKET_ACTIONS } from './actions';
import { joinGame, joinRoom, joinRooms } from './listeners';
import { withSpinner, queryByUserId } from './utils';

type SocketContextType = ReturnType<typeof socketIOClient> | null;

// @ts-ignore
const socket: () => Middleware = () => {
    let connection: SocketContextType = null;

    return (store: typeof _store) => (next) => (action) => {
        if (typeof action === 'function')
            action(store.dispatch, store.getState);
        else {
            switch (action.type) {
                case ROOMS_EVENTS.JOIN_ROOMS:
                    connection = joinRooms(
                        connection,
                        (socketClient) => socketClient(action.payload),
                        store
                    );
                    break;

                case ROOM_EVENTS.JOIN_ROOM:
                    connection = joinRoom(
                        connection,
                        (socketClient) =>
                            socketClient(
                                action.payload,
                                queryByUserId(store.getState())
                            ),
                        store
                    );
                    break;

                case GAME_EVENTS.JOIN_GAME:
                    connection = joinGame(
                        connection,
                        (socketClient) =>
                            socketClient(
                                action.payload,
                                queryByUserId(store.getState())
                            ),
                        store
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
                    connection?.emit(action.type, withSpinner(action, store));
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

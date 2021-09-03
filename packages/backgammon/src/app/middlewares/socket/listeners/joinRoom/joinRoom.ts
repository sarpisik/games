import { ROOM_EVENTS } from 'types/lib/room';
import { withSocketConnection } from '../../utils';
import { onDeleteUser, onEditGame, onJoinRoom, onNewUser } from './handlers';

export default withSocketConnection(function joinRoom(connection, store) {
    connection.on(ROOM_EVENTS.JOIN_ROOM, onJoinRoom(store));
    connection.on(ROOM_EVENTS.NEW_USER, onNewUser(store));
    connection.on(ROOM_EVENTS.DISCONNECT_USER, onDeleteUser(store));
    connection.on(ROOM_EVENTS.EDIT_GAME, onEditGame(store));
});

import { ROOMS_EVENTS } from 'types/lib/rooms';
import { withSocketConnection } from '../../utils';
import { onJoinRooms, onUpdateRooms } from './handlers';

export default withSocketConnection(function joinRooms(connection, store) {
    connection.on(ROOMS_EVENTS.JOIN_ROOMS, onJoinRooms(store));
    connection.on(ROOMS_EVENTS.ROOM_UPDATE, onUpdateRooms(store));
});

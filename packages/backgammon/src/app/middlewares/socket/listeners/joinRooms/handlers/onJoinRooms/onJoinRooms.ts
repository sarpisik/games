import { EmitRooms } from 'types/lib/rooms';
import { setConnectionStatus, setRooms } from '../../../../../../slices';
import { CONNECTION_STATUS } from '../../../../../../slices/connection/connection';
import { store } from '../../../../../../store';

export default function onJoinRooms(s: typeof store) {
    return function joinRooms(rooms: EmitRooms) {
        s.dispatch(setRooms(rooms));
        s.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    };
}

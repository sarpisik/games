import { setConnectionStatus, setRoom } from '../../../../../../slices';
import { CONNECTION_STATUS } from '../../../../../../slices/connection/connection';
import { Room } from '../../../../../../slices/room/room';
import { store } from '../../../../../../store';

export default function onJoinRoom(s: typeof store) {
    return function joinRoom(room: Room) {
        s.dispatch(setRoom(room));
        s.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    };
}

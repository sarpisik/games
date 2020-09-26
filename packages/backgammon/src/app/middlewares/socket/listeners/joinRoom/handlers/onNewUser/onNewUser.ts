import { User } from 'types/lib/user';
import { addRoomUser } from '../../../../../../slices/room/room';
import { store } from '../../../../../../store';

export default function onNewUser(s: typeof store) {
    return function newUser(user: User) {
        s.dispatch(addRoomUser(user));
    };
}

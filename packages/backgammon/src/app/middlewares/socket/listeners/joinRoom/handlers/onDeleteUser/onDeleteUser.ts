import { User } from 'types/lib/user';
import { deleteRoomUser } from '../../../../../../slices/room/room';
import { store } from '../../../../../../store';

export default function onDeleteUser(s: typeof store) {
    return function deleteUser(userId: User['id']) {
        s.dispatch(deleteRoomUser(userId));
    };
}

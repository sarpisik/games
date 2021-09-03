import { BackgammonGame } from '../../game';
import BackgammonRoom from '../../room';

export default function mergeUsers(
    room: BackgammonRoom,
    gameUsers: BackgammonGame['_users']
) {
    return { id: room.id, _users: new Map([...room._users, ...gameUsers]) };
}

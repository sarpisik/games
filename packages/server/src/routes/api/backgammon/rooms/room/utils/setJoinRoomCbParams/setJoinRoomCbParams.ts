import BackgammonRoom from '../../room';
import { mergeUsers } from '../mergeUsers';

export default function setJoinRoomCbParams(
    room: ReturnType<typeof mergeUsers>
): Parameters<ConstructorParameters<typeof BackgammonRoom>[2]>[0] {
    return { id: room.id, users: room._users.size };
}

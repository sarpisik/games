import { store } from '../../../../store';
import { setRooms } from '../../../../slices';
import { EmitRooms } from 'types/lib/rooms';

type Store = typeof store;

type Rooms = ReturnType<Store['getState']>['rooms']['rooms'];

export default function onUpdateRooms(s: Store) {
    return function updateRooms(room: EmitRooms[number]) {
        s.dispatch(setRooms(mapRooms(s.getState().rooms.rooms, room)));
    };
}

function mapRooms(rooms: Rooms, room: Rooms[number]) {
    return rooms.map((_room) => (_room.id === room.id ? room : _room));
}

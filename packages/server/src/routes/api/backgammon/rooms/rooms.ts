import { SOCKET_BACKGAMMON } from '@shared-types/constants';
import { ROOMS_EVENTS, EmitRooms } from '@shared-types/rooms';
import { BackgammonRoom } from './room';
import { RouterType } from '@routes/api/shared/controller';

type IRooms = Map<number, BackgammonRoom>;

export default class Rooms {
    private _namespace: SocketIO.Namespace;
    private _rooms: IRooms;
    router: ReturnType<RouterType>;

    constructor(router: RouterType, _io: SocketIO.Server) {
        this.router = router();
        this.router.get('/rooms', (req, res, next) => {
            res.json('rooms api');
        });

        this._namespace = _io.of(SOCKET_BACKGAMMON);
        this._namespace.on('connection', this._onClientConnection.bind(this));
        this._rooms = new Map();

        // Register rooms.
        for (let i = 1; i <= 10; i++) {
            this._rooms.set(
                i,
                new BackgammonRoom(
                    i,
                    // Create custom room channel for each room.
                    _io,
                    // Notify sockets on update
                    this._onClientJoinRoom.bind(this)
                )
            );
        }
    }

    private _onClientConnection(socket: SocketIO.Socket) {
        socket.emit(
            ROOMS_EVENTS.JOIN_ROOMS,
            parseRooms(mapToArray(this._rooms))
        );
    }

    protected _onClientJoinRoom(room: EmitRooms[number]) {
        this._namespace.emit(ROOMS_EVENTS.ROOM_UPDATE, room);
    }
}

function mapToArray(rooms: IRooms) {
    return Array.from(rooms);
}

function parseRooms(rooms: ReturnType<typeof mapToArray>) {
    return rooms.map(mapOutRoom);
}

function mapOutRoom(_room: [number, BackgammonRoom]): EmitRooms[number] {
    const [id, room] = _room;
    return { id, users: room._users.size };
}

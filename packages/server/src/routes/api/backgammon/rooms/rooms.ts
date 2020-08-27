import { SOCKET_BACKGAMMON } from '@shared-types/constants';
import { ROOM_EVENTS } from '@shared-types/room';
import { BackgammonRoom } from './room';
import { RouterType } from '@routes/api/shared/controller';

export default class Rooms {
    private _namespace: SocketIO.Namespace;
    private _rooms: Map<number, BackgammonRoom>;
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
                    _io
                )
            );
        }
    }

    private _onClientConnection(socket: SocketIO.Socket) {
        socket.emit(ROOM_EVENTS.JOIN_ROOMS, [...this._rooms.keys()]);
    }
}

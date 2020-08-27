import { SOCKET_BACKGAMMON } from '@shared-types/constants';
import { ROOM_EVENTS } from '@shared-types/room';
import { BackgammonRoom } from './room';
import { RouterType } from '@routes/api/shared/controller';
import { GAME_EVENTS } from '@shared-types/game';

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
                    this._namespace
                )
            );
        }
    }

    private _onClientConnection(socket: SocketIO.Socket) {
        socket.emit(ROOM_EVENTS.JOIN_ROOMS, [...this._rooms.keys()]);
        socket.on(ROOM_EVENTS.JOIN_ROOM, this._onJoinRoom.call(this, socket));
        socket.on(GAME_EVENTS.JOIN_GAME, this._onJoinGame.call(this, socket));
    }

    private _onJoinRoom(socket: SocketIO.Socket) {
        return (roomName: number) => {
            socket.join(roomName.toString());
            const room = this._rooms.get(roomName);
            const games = room?.games.map(({ id }) => ({ id }));
            socket.emit(ROOM_EVENTS.JOIN_ROOM, { id: room?.id, games });
        };
    }

    private _onJoinGame(socket: SocketIO.Socket) {
        return (roomName: number) => {
            console.log(roomName);

            socket.join(roomName.toString());
            // socket.emit(GAME_EVENTS.JOIN_GAME, { id: room?.id, games });
        };
    }
}

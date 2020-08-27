import { generateBackgammonRoomPath } from '@shared-types/helpers';
import { ROOM_EVENTS } from '@shared-types/room';
import { BackgammonGame } from './game';
import { RoomType } from './types';

export default class BackgammonRoom implements RoomType {
    private _namespace: SocketIO.Namespace;
    private _games: Map<BackgammonGame['id'], BackgammonGame>;

    constructor(public id: number, _io: SocketIO.Server) {
        // const users = new Set();

        this._namespace = _io.of(generateBackgammonRoomPath(id));
        this._namespace.on('connection', this._onClientConnection.bind(this));

        this._games = new Map();
        for (let i = 1; i <= 10; i++) {
            this._games.set(i, new BackgammonGame(i, id, _io));
        }
    }

    private _onClientConnection(socket: SocketIO.Socket) {
        const id = this.id;
        const games = [...this._games.values()].map((value) => ({
            id: value.id,
            stages: value.stages,
            duration: value.duration,
            players: value.players,
        }));
        socket.emit(ROOM_EVENTS.JOIN_ROOM, { id, games });
    }
}

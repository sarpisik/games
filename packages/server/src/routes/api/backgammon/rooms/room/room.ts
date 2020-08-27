import { generateBackgammonRoomPath } from '@shared-types/helpers';
import { BackgammonGame } from './game';
import { RoomType } from './types';
import { ROOMS_EVENTS } from '@shared-types/rooms';

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
        socket.emit(ROOMS_EVENTS.JOIN_ROOMS, [...this._games.keys()]);
    }
}

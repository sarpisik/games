import { RoomType } from './types';
import { BackgammonGame } from './game';
import {
    generateBackgammonRoomPath,
    generateBackgammonGamePath,
} from '@shared-types/helpers';
import { ROOM_EVENTS } from '@shared-types/room';

export default class BackgammonRoom implements RoomType {
    private _namespace: SocketIO.Namespace;
    games: RoomType['games'];

    constructor(public id: number, _io: SocketIO.Server) {
        const users = new Set();

        this._namespace = _io.of(generateBackgammonRoomPath(id));
        this._namespace.on('connection', (socket) => {
            console.log(`Client connected to room id: ${id}`);

            const socketId = socket.id;
            users.add(socketId);

            socket.on('disconnect', () => {
                users.delete(socketId);
                socket.emit(ROOM_EVENTS.NEW_USER, users.size);
            });
        });

        this.games = [];
        for (let i = 1; i <= 10; i++) {
            this.games.push(
                new BackgammonGame(i, _io.of(generateBackgammonGamePath(id, i)))
            );
        }
    }
}

import { generateBackgammonRoomPath } from '@shared-types/helpers';
import { EmitEditGame, ROOM_EVENTS } from '@shared-types/room';
import { BackgammonGame } from './game';
import { RoomType } from './types';
import { customPromise } from '@shared/customPromise';

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
        socket.on(
            ROOM_EVENTS.EDIT_GAME,
            this._handleEditGame.call(this, socket)
        );
    }

    private _handleEditGame(socket: SocketIO.Socket) {
        return async (data: EmitEditGame) => {
            const game = this._games.get(data.id);

            if (!game) socket.emit(ROOM_EVENTS.GAME_NOT_FOUND, data.id);
            else {
                await customPromise(() => {
                    Object.assign(game, data);
                });

                this._namespace.emit(ROOM_EVENTS.EDIT_GAME, data);
            }
        };
    }
}

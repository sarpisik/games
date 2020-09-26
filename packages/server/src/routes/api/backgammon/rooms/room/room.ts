import { generateBackgammonRoomPath } from '@shared-types/helpers';
import { EmitEditGame, OnEditGame, ROOM_EVENTS } from '@shared-types/room';
import { customPromise } from '@shared/customPromise';
import { SocketConnection } from '../shared/socketConnection';
import { BackgammonGame } from './game';
import { RoomType } from './types';
import { parseGame, parseUser } from './utils';
import { EmitRooms } from '@shared-types/rooms';

export default class BackgammonRoom extends SocketConnection
    implements RoomType {
    _games: Map<BackgammonGame['id'], BackgammonGame>;

    constructor(
        public id: number,
        _io: SocketIO.Server,
        clientJoinRoomCb: (room: EmitRooms[number]) => unknown
    ) {
        super(_io, generateBackgammonRoomPath(id));

        this._namespace.on(
            'connection',
            this._handleClientConnection.call(this, clientJoinRoomCb)
        );

        this._games = new Map();
        for (let i = 1; i <= 10; i++) {
            this._games.set(
                i,
                new BackgammonGame(
                    i,
                    id,
                    _io,
                    this._handleGameUpdate.bind(this)
                )
            );
        }
    }

    private _handleClientConnection(
        clientJoinRoomCb: ConstructorParameters<typeof BackgammonRoom>[2]
    ) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        return function _onClientConnection(socket: SocketIO.Socket) {
            const id = self.id;
            const clientId = socket.client.id;
            const _users = self._users;
            const users = [..._users.values()].map(parseUser);
            const _games = self._games;
            const games = [..._games.values()].map(parseGame);
            // Send updates users to rooms
            clientJoinRoomCb(setParams(self));

            // Send room details to connected client.
            socket.emit(ROOM_EVENTS.JOIN_ROOM, { id, games, users });

            // Send details of the joined client
            socket.broadcast.emit(
                ROOM_EVENTS.NEW_USER,
                self._users.get(clientId)?.user
            );

            socket.on(
                ROOM_EVENTS.EDIT_GAME,
                self._handleEditGame.call(self, socket)
            );

            // Disconnect events
            socket.on('disconnect', () => {
                if (_users.has(clientId)) {
                    // Broadcast disconnected client.
                    socket.broadcast.emit(
                        ROOM_EVENTS.DISCONNECT_USER,
                        _users.get(clientId)?.user.id
                    );

                    // Delete client from the users list.
                    _users.delete(clientId);

                    // Send updates users to rooms
                    clientJoinRoomCb(setParams(self));
                }
            });
        };
    }

    private _handleEditGame(socket: SocketIO.Socket) {
        return async (data: EmitEditGame) => {
            const roomId = this.id;
            const game = this._games.get(data.id);

            if (!game) socket.emit(ROOM_EVENTS.GAME_NOT_FOUND, data.id);
            else {
                await customPromise(() => {
                    Object.assign(game, data);
                });
                const parsedGame = parseGame(game);
                const payload: OnEditGame = await customPromise(() =>
                    Object.assign({}, parsedGame, { roomId })
                );

                this._emitEditGame(payload);
            }
        };
    }

    private _handleGameUpdate(gameId: number) {
        const _game = this._games.get(gameId) as BackgammonGame;
        const game = parseGame(_game);
        this._emitEditGame(game);
    }

    private _emitEditGame<P>(payload: P) {
        this._namespace.emit(ROOM_EVENTS.EDIT_GAME, payload);
    }
}

function setParams(
    room: BackgammonRoom
): Parameters<ConstructorParameters<typeof BackgammonRoom>[2]>[0] {
    return { id: room.id, users: room._users.size };
}

import { User } from '@shared-backgammon/src/types/user';
import { generateBackgammonRoomPath } from '@shared-types/helpers';
import { EmitEditGame, OnEditGame, ROOM_EVENTS } from '@shared-types/room';
import { customPromise } from '@shared/customPromise';
import { BackgammonGame } from './game';
import { RoomType } from './types';
import { fetchUser, validateUser } from './utils';

export default class BackgammonRoom implements RoomType {
    private _namespace: SocketIO.Namespace;
    _games: Map<BackgammonGame['id'], BackgammonGame>;
    _users: Map<string, User>;

    constructor(public id: number, _io: SocketIO.Server) {
        this._namespace = _io.of(generateBackgammonRoomPath(id));
        this._namespace.use(this._authMiddleware.bind(this));
        this._namespace.on('connection', this._onClientConnection.bind(this));

        this._users = new Map();
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

    private async _authMiddleware(
        socket: SocketIO.Socket,
        next: (err?: any) => void
    ) {
        const userId = socket.handshake.query.userId;
        const response = await fetchUser(userId);
        const user = response?.data?.getUser;
        if (validateUser(user)) {
            let userExistWithDifferentId = false;

            const users = this._users.values();
            for (const _user of users) {
                if (_user.id === user.id) {
                    userExistWithDifferentId = true;
                    break;
                }
            }

            if (!userExistWithDifferentId)
                this._users.set(socket.client.id, user);

            next();
        } else next(new Error('User does not exist.'));
    }

    private _onClientConnection(socket: SocketIO.Socket) {
        const id = this.id;
        const clientId = socket.client.id;
        const _users = this._users;
        const users = [..._users.values()];
        const _games = this._games;
        const games = [..._games.values()].map(this._parseGame);
        // Send room details to connected client.
        socket.emit(ROOM_EVENTS.JOIN_ROOM, { id, games, users });

        // Send details of the joined client
        socket.broadcast.emit(ROOM_EVENTS.NEW_USER, this._users.get(clientId));

        socket.on(
            ROOM_EVENTS.EDIT_GAME,
            this._handleEditGame.call(this, socket)
        );

        // Disconnect events
        socket.on('disconnect', () => {
            if (_users.has(clientId)) {
                // Broadcast disconnected client.
                socket.broadcast.emit(
                    ROOM_EVENTS.DISCONNECT_USER,
                    _users.get(clientId)?.id
                );

                // Delete client from the users list.
                _users.delete(clientId);
            }
        });
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
                const parsedGame = this._parseGame(game);
                const payload: OnEditGame = await customPromise(() =>
                    Object.assign({}, parsedGame, { roomId })
                );

                this._emitEditGame(payload);
            }
        };
    }

    private _handleGameUpdate(gameId: number) {
        const _game = this._games.get(gameId) as BackgammonGame;
        const game = this._parseGame(_game);
        this._emitEditGame(game);
    }

    private _emitEditGame<P>(payload: P) {
        this._namespace.emit(ROOM_EVENTS.EDIT_GAME, payload);
    }

    private _parseGame(game: BackgammonGame) {
        return {
            id: game.id,
            stages: game.stages,
            duration: game.duration,
            players: game.players,
            score: game.score,
        };
    }
}

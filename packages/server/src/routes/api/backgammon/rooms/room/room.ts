import { User } from '@shared-backgammon/src/types/user';
import { generateBackgammonRoomPath } from '@shared-types/helpers';
import { EmitEditGame, OnEditGame, ROOM_EVENTS } from '@shared-types/room';
import { customPromise } from '@shared/customPromise';
import { BackgammonGame } from './game';
import { RoomType } from './types';
import { fetchUser, validateUser } from './utils';

export default class BackgammonRoom implements RoomType {
    private _namespace: SocketIO.Namespace;
    private _games: Map<BackgammonGame['id'], BackgammonGame>;
    private _users: Map<string, User>;

    constructor(public id: number, _io: SocketIO.Server) {
        // const users = new Set();

        this._namespace = _io.of(generateBackgammonRoomPath(id));
        this._namespace.use(this._authMiddleware.bind(this));
        this._namespace.on('connection', this._onClientConnection.bind(this));

        this._users = new Map();
        this._games = new Map();
        for (let i = 1; i <= 10; i++) {
            this._games.set(i, new BackgammonGame(i, id, _io));
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
        const games = [..._games.values()].map((value) => ({
            id: value.id,
            stages: value.stages,
            duration: value.duration,
            players: value.players,
        }));
        socket.emit(ROOM_EVENTS.JOIN_ROOM, { id, games, users });
        socket.on('disconnect', () => {
            if (_users.has(clientId)) _users.delete(clientId);
        });
        socket.on(
            ROOM_EVENTS.EDIT_GAME,
            this._handleEditGame.call(this, socket)
        );
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
                const payload: OnEditGame = await customPromise(() => ({
                    roomId,
                    id: game.id,
                    stages: game.stages,
                    duration: game.duration,
                    players: game.players,
                    score: game.score,
                }));

                this._namespace.emit(ROOM_EVENTS.EDIT_GAME, payload);
            }
        };
    }
}

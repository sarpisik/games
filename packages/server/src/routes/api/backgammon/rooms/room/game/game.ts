import { GameServerSide, PLAYERS } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import { generateBackgammonGamePath } from '@shared-types/helpers';
import { generatePlayersObj } from './helpers';
import { fetchUser, validateUser } from '../utils';

type User = Exclude<
    GameServerSide['players'][keyof GameServerSide['players']],
    null
>;

export default class BackgammonGame implements GameServerSide {
    players: GameServerSide['players'];
    score: GameServerSide['score'];
    stages: GameServerSide['stages'];
    duration: GameServerSide['duration'];
    timer: GameServerSide['timer'];
    rounds: GameServerSide['rounds'];
    private _namespace: SocketIO.Namespace;
    private _connectedUsers: Map<string, User>;

    constructor(
        public id: number,
        private _roomId: number,
        _io: SocketIO.Server,
        disconnectCb: (id: number) => void
    ) {
        this.players = generatePlayersObj(null, null);
        this.score = generatePlayersObj(0, 0);
        this.stages = 1;
        this.duration = 60;
        this.timer = generatePlayersObj(60, 60);
        this.rounds = [];

        this._connectedUsers = new Map();

        this._namespace = _io.of(generateBackgammonGamePath(this._roomId, id));
        this._namespace.use(this._authMiddleware.bind(this));
        this._namespace.on(
            'connection',
            this._handleClientConnection.call(this, disconnectCb)
        );
    }

    private async _authMiddleware(
        socket: SocketIO.Socket,
        next: (err?: any) => void
    ) {
        const clientId = socket.client.id;
        const userId = socket.handshake.query.userId;

        const response = await fetchUser(userId);
        const user = response?.data?.getUser;
        if (validateUser(user)) {
            let userExistWithDifferentId = false;

            const users = this._connectedUsers.values();
            for (const _user of users) {
                if (_user?.id === user.id) {
                    userExistWithDifferentId = true;
                    break;
                }
            }

            if (!userExistWithDifferentId)
                this._connectedUsers.set(clientId, user);

            next();
        } else next(new Error('User does not exist.'));
    }

    private _handleClientConnection(disconnectCb: (id: number) => void) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        return function _onClientConnection(socket: SocketIO.Socket) {
            const clientId = socket.client.id;

            socket.emit(GAME_EVENTS.JOIN_GAME, self);

            // Disconnect events
            socket.on('disconnect', () => {
                const connectedUsers = self._connectedUsers;

                if (connectedUsers.has(clientId)) {
                    const user = connectedUsers.get(clientId) as User;
                    const userId = user.id;
                    const userName = user.name;

                    const wasPlayer = self._checkIsPlayer(userId);

                    // Delete client from the users list.
                    connectedUsers.delete(clientId);

                    // Broadcast disconnected client.
                    socket.broadcast.emit(
                        GAME_EVENTS.DISCONNECT_USER,
                        userName
                    );

                    // If disconnected user was one of the players...
                    if (wasPlayer) {
                        // Delete the player.
                        self._deletePlayer(userId);

                        // Notify the game users.
                        socket.broadcast.emit(
                            GAME_EVENTS.DISCONNECT_PLAYER,
                            self.players
                        );

                        // Notify the room users.
                        disconnectCb(self.id);
                    }
                }
            });
        };
    }

    private _checkIsPlayer(userId: string) {
        const players = this.players;

        return (
            players[PLAYERS.BLACK]?.id === userId ||
            players[PLAYERS.WHITE]?.id === userId
        );
    }

    private _deletePlayer(userId: User['id']) {
        const players = this.players;

        if (players[PLAYERS.BLACK]?.id === userId)
            players[PLAYERS.BLACK] = null;
        else if (players[PLAYERS.WHITE]?.id === userId)
            players[PLAYERS.WHITE] = null;
    }
}

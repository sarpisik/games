import { User } from '@shared-backgammon/src/types/user';
import { PLAYERS } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';
import { checkIsPlayer, deletePlayer } from './utils';

export default function handleDisconnect(
    this: BackgammonGame,
    clientId: string,
    socket: SocketIO.Socket,
    disconnectCb: (arg0: number) => void
) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return function onDisconnect() {
        const connectedUsers = self._users;

        if (connectedUsers.has(clientId)) {
            const players = self.players;
            const user = connectedUsers.get(clientId) as User;
            const userId = user.id;
            const userName = user.name;

            const wasPlayer = checkIsPlayer(userId, players);

            // Delete client from the users list.
            connectedUsers.delete(clientId);

            // Broadcast disconnected client.
            socket.broadcast.emit(GAME_EVENTS.DISCONNECT_USER, userName);

            // If disconnected user was one of the players...
            if (wasPlayer) {
                const gameNotOver = self._status === 'INITIALIZED';
                if (gameNotOver) {
                    // TODO: call disconnect timer.
                    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // // @ts-ignore
                    // self._handleDisconnectPlayer(socket);
                } else {
                    // Delete the player.
                    deletePlayer(userId, players);

                    // Reset game if no players left.
                    Boolean(
                        self.players[PLAYERS.BLACK] ||
                            self.players[PLAYERS.WHITE]
                    ) || self._resetGame();

                    // Notify the game users.
                    socket.broadcast.emit(
                        GAME_EVENTS.DISCONNECT_PLAYER,
                        players
                    );
                }

                // Notify the room users.
                disconnectCb(self.id);
            }
        }
    };
}

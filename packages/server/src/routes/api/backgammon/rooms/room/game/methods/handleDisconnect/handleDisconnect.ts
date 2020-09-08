import { User } from '@shared-backgammon/src/types/user';
import { PLAYERS } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';
import { checkIsPlayer, deletePlayer } from './utils';
import logger from '@shared/Logger';

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
            const { id, name } = user;

            const wasPlayer = checkIsPlayer(id, players);

            // Delete client from the users list.
            connectedUsers.delete(clientId);
            logger.info(`disconnected user ${name} by id: ${id}`);
            // Broadcast disconnected client.
            socket.broadcast.emit(GAME_EVENTS.DISCONNECT_USER, name);

            // If disconnected user was one of the players...
            if (wasPlayer) {
                // Delete the disconnected player.
                deletePlayer(id, players);

                const gameNotOver = self._status === 'INITIALIZED';
                if (gameNotOver) self._handlePlayerDisconnect({ id, name });
                else {
                    // Reset game if no players left.
                    Boolean(
                        self.players[PLAYERS.BLACK] ||
                            self.players[PLAYERS.WHITE]
                    ) || self._resetGame();
                }

                // Update players list client side.
                socket.broadcast.emit(GAME_EVENTS.DISCONNECT_PLAYER, players);

                // Notify the room users.
                disconnectCb(self.id);
            }
        }
    };
}

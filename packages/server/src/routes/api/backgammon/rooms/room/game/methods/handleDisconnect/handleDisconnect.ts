import { User } from '@shared-backgammon/src/types/user';
import { GAME_EVENTS } from '@shared-types/game';
import logger from '@shared/Logger';
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
            const user = connectedUsers.get(clientId)?.user as User;
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

                // If player disconnected during the game, run timer.
                // Else, reset game.
                if (self._status === 'INITIALIZED') {
                    // Update players list client side.
                    socket.broadcast.emit(
                        GAME_EVENTS.DISCONNECT_PLAYER,
                        players
                    );
                    // Start timer.
                    self._handlePlayerDisconnect({ id, name });
                } else self._setStatus('UNINITIALIZED', self);

                // Notify the room users.
                disconnectCb(self.id);
            }
        } else
            logger.error(
                `Can not find user on disonnection by client id ${clientId}`
            );
    };
}

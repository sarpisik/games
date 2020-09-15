import logger from '@shared/Logger';
import SocketConnection from '../../socketConnection';

export default async function authMiddleware(
    this: SocketConnection,
    socket: SocketIO.Socket,
    next: (err?: any) => void
) {
    try {
        const userId = socket.handshake.query.userId;

        const response = await this._userApi.fetchUser(userId);
        const user = response?.data?.getUser;

        if (this._userApi.validateUser(user)) {
            const entires = this._users[Symbol.iterator]();
            for (const entry of entires) {
                const [socketClientId, data] = entry;
                const duplicateConnection = data.user.id === user.id;
                if (duplicateConnection) {
                    // Delete prev connection only. Delete of duplicated user
                    // will be handled by related api controller.
                    data.socket.disconnect(true);
                    logger.warn(
                        `Duplicate client connection. Deleting ${socketClientId}`
                    );
                    break;
                }
            }

            // Save new connection
            this._users.set(socket.client.id, { socket, user });
            logger.info(
                `Client ${user.name} connected by id ${socket.client.id}`
            );

            next();
        } else next(new Error('User does not exist.'));
    } catch (error) {
        logger.error(
            error?.message,
            'Something went wrong in "authMiddleware" method.'
        );
        next(error);
    }
}

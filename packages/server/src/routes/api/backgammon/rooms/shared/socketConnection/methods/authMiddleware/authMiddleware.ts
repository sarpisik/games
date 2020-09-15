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
            let userExistWithDifferentId = '';

            const entires = this._users[Symbol.iterator]();
            for (const entry of entires) {
                const [socketClientId, _user] = entry;
                if (_user.id === user.id) {
                    userExistWithDifferentId = socketClientId;
                    break;
                }
            }

            // Delete prev connection
            if (userExistWithDifferentId) {
                this._users.delete(userExistWithDifferentId);
                logger.warn(
                    `Duplicate client connection. Deleting ${userExistWithDifferentId}`
                );
            }

            // Save new connection
            this._users.set(socket.client.id, user);
            logger.info(
                `Client ${user.name} connected by id ${socket.client.id}`
            );

            next();
        } else next(new Error('User does not exist.'));
    } catch (error) {
        next(error);
    }
}

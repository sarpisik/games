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
    } catch (error) {
        next(error);
    }
}

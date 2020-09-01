import { User } from '@shared-backgammon/src/types/user';
import { UserApi } from './lib';

export default class SocketConnection {
    protected _namespace: SocketIO.Namespace;
    private _userApi: UserApi;
    protected _users: Map<string, User>;

    constructor(_io: SocketIO.Server, _path: string) {
        this._namespace = _io.of(_path);
        this._namespace.use(this._authMiddleware.bind(this));
        this._userApi = new UserApi();
        this._users = new Map();
    }

    private async _authMiddleware(
        socket: SocketIO.Socket,
        next: (err?: any) => void
    ) {
        const userId = socket.handshake.query.userId;

        const response = await this._userApi.fetchUser(userId);
        const user = response?.data?.getUser;

        if (this._userApi.validateUser(user)) {
            let userExistWithDifferentId = false;

            const users = this._users.values();
            for (const _user of users) {
                if (_user?.id === user.id) {
                    userExistWithDifferentId = true;
                    break;
                }
            }

            if (!userExistWithDifferentId)
                this._users.set(socket.client.id, user);

            next();
        } else next(new Error('User does not exist.'));
    }
}

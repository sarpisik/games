import { User } from '@shared-backgammon/src/types/user';
import UserApi from '@shared/userApi';
import { authMiddleware } from './methods';

export default class SocketConnection {
    protected _namespace: SocketIO.Namespace;
    protected _userApi = new UserApi();
    _users: Map<string, User>;
    private _authMiddleware: typeof authMiddleware;

    constructor(_io: SocketIO.Server, _path: string) {
        // methods
        this._authMiddleware = authMiddleware.bind(this);

        // socket connection
        this._namespace = _io.of(_path);
        this._namespace.use(this._authMiddleware.bind(this));

        // connected users
        this._users = new Map();
    }
}

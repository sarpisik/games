import authMiddleware from '../authMiddleware';

describe('authMiddleware', () => {
    let socketConnection: {
            _userApi: {
                fetchUser: jasmine.Spy<jasmine.Func>;
                validateUser: jasmine.Spy<jasmine.Func>;
            };
            _users: Map<string, { id: string }>;
        },
        socket: {
            handshake: Pick<SocketIO.Socket['handshake'], 'query'>;
            client: Pick<SocketIO.Socket['client'], 'id'>;
        },
        next: jasmine.Spy<jasmine.Func>;

    beforeEach(() => {
        socketConnection = {
            _userApi: {
                fetchUser: jasmine.createSpy(),
                validateUser: jasmine.createSpy(),
            },
            _users: new Map(),
        };
        socket = {
            handshake: {
                query: {
                    userId: 12345,
                },
            },
            client: { id: 'client-connection-id' },
        };
        next = jasmine.createSpy();
    });

    it('calls "next" callback within user api exception', (done) => {
        const rejectWith = 'Api request failed.';
        socketConnection._userApi.fetchUser.and.rejectWith(rejectWith);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        authMiddleware.call(socketConnection, socket, next).then(() => {
            expect(next).toHaveBeenCalledWith(rejectWith);
            done();
        });
    });

    it('calls "next" callback within custom exception', (done) => {
        const exception = 'User does not exist.';
        socketConnection._userApi.fetchUser.and.resolveTo(null);
        socketConnection._userApi.validateUser.and.returnValue(false);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        authMiddleware.call(socketConnection, socket, next).then(() => {
            expect(next).toHaveBeenCalledWith(new Error(exception));
            done();
        });
    });

    it('calls "next" callback within empty parameters and registers fetched user.', (done) => {
        const mockUser = {
            data: { getUser: { id: '12345' } },
        };
        socketConnection._userApi.fetchUser.and.resolveTo(mockUser);
        socketConnection._userApi.validateUser.and.returnValue(true);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        authMiddleware.call(socketConnection, socket, next).then(() => {
            expect(next).toHaveBeenCalled();
            expect(socketConnection._users.has(socket.client.id)).toBeTrue();
            done();
        });
    });

    it('calls "next" callback within empty parameters and does not register fetched user when already registered.', (done) => {
        const mockUser = {
            data: { getUser: { id: '12345' } },
        };
        socketConnection._userApi.fetchUser.and.resolveTo(mockUser);
        socketConnection._userApi.validateUser.and.returnValue(true);
        socketConnection._users.set(
            'an-unique-already-connected-id',
            mockUser.data.getUser
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        authMiddleware.call(socketConnection, socket, next).then(() => {
            expect(next).toHaveBeenCalled();
            expect(socketConnection._users.has(socket.client.id)).toBeFalse();
            done();
        });
    });
});

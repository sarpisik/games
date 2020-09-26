import socketIOClient from 'socket.io-client';
import { store } from '../../../../store';

export default function withSocketConnection(
    wrappedListener: (
        connection: SocketIOClient.Socket,
        s: typeof store
    ) => unknown
) {
    return function socketConnection(
        connection: Parameters<typeof wrappedListener>[0] | null,
        socketUrl: string,
        store: Parameters<typeof wrappedListener>[1]
    ) {
        if (connection !== null) connection.disconnect();

        connection = socketIOClient(socketUrl);

        wrappedListener(connection, store);

        return connection;
    };
}

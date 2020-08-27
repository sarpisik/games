import React from 'react';
import { CONNECTION_STATUS } from '../../../../app/slices/connection/connection';
import { useConnection } from './hooks';

const REACT_APP_SOCKET_URL = process.env.REACT_APP_SOCKET_URL as string;

export default function withRoomsConnection<Props>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithRoomsConnection(props: Props): React.ReactElement {
        const connectionStatus = useConnection(REACT_APP_SOCKET_URL);

        if (connectionStatus === CONNECTION_STATUS.PRE_CONNECT)
            return <p>Starting to connect server.</p>;

        if (connectionStatus === CONNECTION_STATUS.CONNECTING)
            return <p>Connecting to server please wait...</p>;

        if (connectionStatus === CONNECTION_STATUS.DISCONNECTED)
            return <p>Disconnected from server.</p>;

        return <WrappedComponent {...props} />;
    };
}

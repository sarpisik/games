import React from 'react';
import { useParams } from 'react-router-dom';
import { mergePath } from 'types/lib/helpers';
import { CONNECTION_STATUS } from '../../../../app/slices/connection/connection';
import { useConnection } from './hooks';

const REACT_APP_SOCKET_URL = process.env.REACT_APP_SOCKET_URL as string;

export default function withGameConnection<Props>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithGameConnection(props: Props): React.ReactElement {
        const params = useParams<{ id: string; gameId: string }>();
        const connectionStatus = useConnection(
            mergePath(mergePath(REACT_APP_SOCKET_URL, params.id), params.gameId)
        );

        if (connectionStatus === CONNECTION_STATUS.PRE_CONNECT)
            return <p>Starting to connect server.</p>;

        if (connectionStatus === CONNECTION_STATUS.CONNECTING)
            return <p>Connecting to server please wait...</p>;

        if (connectionStatus === CONNECTION_STATUS.DISCONNECTED)
            return <p>Disconnected from server.</p>;

        return <WrappedComponent {...props} />;
    };
}

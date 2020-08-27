import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ROOMS_EVENTS } from 'types/lib/rooms';
import { SOCKET_ACTIONS } from '../../../../../../app/middlewares/socket/actions';
import { useConnectionStatus } from '../../../../../../app/slices/connection';

export default function useConnection(url: string) {
    const dispatch = useDispatch();
    const connectionStatus = useConnectionStatus();

    useEffect(
        function connectGame() {
            dispatch({
                type: ROOMS_EVENTS.JOIN_ROOMS,
                payload: url,
            });

            return () => {
                dispatch({ type: SOCKET_ACTIONS.DISCONNECT });
            };
        },
        // skip dep dispatch
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [url]
    );

    return connectionStatus;
}

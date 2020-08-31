import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GAME_EVENTS } from 'types/lib/game';
import { SOCKET_ACTIONS } from '../../../../../../app/middlewares/socket/actions';
import { useConnectionStatus } from '../../../../../../app/slices/connection';

export default function useConnection(url: string) {
    const dispatch = useDispatch();
    const connectionStatus = useConnectionStatus();

    useEffect(
        function connectGame() {
            dispatch({
                type: GAME_EVENTS.JOIN_GAME,
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

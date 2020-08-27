import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ROOM_EVENTS } from 'types/lib/room';
import { SOCKET_ACTIONS } from '../../../../app/middlewares/socket/actions';

export default function useConnection() {
    const dispatch = useDispatch();

    useEffect(
        function connectRoom() {
            // Connec to room.
            dispatch({ type: ROOM_EVENTS.JOIN_ROOMS });

            return () => {
                dispatch({ type: SOCKET_ACTIONS.DISCONNECT });
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
}

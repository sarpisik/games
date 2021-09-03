import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EmitJoinRoom, ROOM_EVENTS } from 'types/lib/room';
import { SOCKET_ACTIONS } from '../../../../app/middlewares/socket/actions';

export default function useConnectRoom() {
    const params = useParams<{ id: string }>();
    const dispatch = useDispatch();

    useEffect(
        function connectRoom() {
            const payload: EmitJoinRoom = parseInt(params.id || '1');
            dispatch({ type: ROOM_EVENTS.JOIN_ROOM, payload });

            return () => {
                dispatch({ type: SOCKET_ACTIONS.DISCONNECT });
            };
        },
        // skip dispatch
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [params.id]
    );
}

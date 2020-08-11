import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EVENTS } from 'types/lib/backgammon';
import { SOCKET_ACTIONS } from '../../../../app/middlewares/socket/actions';
import { useUser, useGame } from '../../../../app/slices';

export default function useInitializeGame() {
    const params = useParams<{ id: string }>();

    const dispatch = useDispatch();
    const { user, signIn } = useUser();
    const { game } = useGame();

    useEffect(function createUserId() {
        if (user.id < 0) signIn(Date.now());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(
        function connectRoom() {
            // Connec to room.
            dispatch({ type: EVENTS.JOIN_ROOM, payload: params.id });

            return () => {
                dispatch({ type: SOCKET_ACTIONS.DISCONNECT });
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(
        function registerUserToGame() {
            const registeredUser = Object.values(game.players).includes(
                user.id
            );
            const shouldRegister =
                game.id > 0 && user.id > 0 && !registeredUser;
            debugger;
            if (shouldRegister) {
                dispatch({ type: EVENTS.SIGN_IN_USER, payload: user.id });
            }
        },
        // skip dep dispatch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [game.id, user.id]
    );
}

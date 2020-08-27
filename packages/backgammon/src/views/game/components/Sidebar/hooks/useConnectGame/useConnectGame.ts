import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { generateBackgammonGamePath } from 'types/lib/helpers';
import { GAME_EVENTS } from 'types/lib/game';

export default function useConnectGame() {
    const dispatch = useDispatch();
    const params = useParams<{ id: string; gameId: string }>();
    const { id, gameId } = params;

    useEffect(
        function connectGame() {
            const payload = generateBackgammonGamePath(id, gameId);
            dispatch({ type: GAME_EVENTS.JOIN_GAME, payload });
            setTimeout(() => {
                dispatch({ type: GAME_EVENTS.INITIALIZE_GAME });
            }, 1000);
        },
        // skip dispatch
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [gameId, id]
    );
}

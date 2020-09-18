import { useDispatch } from 'react-redux';
import { User } from 'types/lib/backgammon';
import { EmitSurrender, GAME_EVENTS } from 'types/lib/game';

export default function useDispatchSurrender(id: User['id']) {
    const dispatch = useDispatch();

    const dispatchSurrender = (type: EmitSurrender['type']) => () => {
        const payload: EmitSurrender = { type, payload: { id } };
        dispatch({ type: GAME_EVENTS.SURRENDER, payload });
    };

    return dispatchSurrender;
}

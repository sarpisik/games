import { useDispatch, useSelector } from 'react-redux';
import { EVENTS } from 'types/lib/backgammon';
import { RootState } from '../../../../store';

export default function useUndoHistory() {
    const dispatch = useDispatch();
    const rounds = useSelector(selector);

    const length = rounds.length;
    const isUndo = rounds[length - 1]?.player === rounds[length - 2]?.player;
    const undoRound = () => {
        dispatch({ type: EVENTS.UNDO_ROUND, payload: rounds });
    };

    return [isUndo, undoRound] as const;
}

function selector(state: RootState) {
    return state.game.rounds;
}

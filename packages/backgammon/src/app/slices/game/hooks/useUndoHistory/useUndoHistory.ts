import { useDispatch, useSelector } from 'react-redux';
import { EVENTS, EmitUndoRound } from 'types/lib/backgammon';
import { RootState } from '../../../../store';

export default function useUndoHistory() {
    const dispatch = useDispatch();
    const game = useSelector(selector);
    const { id, rounds } = game;

    const length = rounds.length;
    const isUndo =
        length > 0 && rounds[length - 1]?.player === rounds[length - 2]?.player;
    const undoRound = () => {
        const payload: EmitUndoRound = { gameId: id };
        dispatch({ type: EVENTS.UNDO_ROUND, payload });
    };

    return [isUndo, undoRound] as const;
}

function selector(state: RootState) {
    return state.game;
}

import { useDispatch, useSelector } from 'react-redux';
import { EVENTS, EmitUndoRound } from 'types/lib/backgammon';
import { RootState } from '../../../../store';
import { editRound } from '../../game';

export default function useUndoHistory() {
    const dispatch = useDispatch();
    const game = useSelector(selector);
    const { id, rounds, isRoundPlayer } = game;

    const length = rounds.length;
    const latestRound = rounds[length - 1];
    const isUndo =
        isRoundPlayer &&
        length > 0 &&
        latestRound?.player === rounds[length - 2]?.player &&
        !latestRound?.loading;
    const undoRound = () => {
        const payload: EmitUndoRound = { gameId: id };
        editRound(Object.assign({}, latestRound, { loading: true }));
        dispatch({ type: EVENTS.UNDO_ROUND, payload });
    };

    return [isUndo, undoRound] as const;
}

function selector(state: RootState) {
    return state.game;
}

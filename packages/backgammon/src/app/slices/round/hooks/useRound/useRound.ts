import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { resetRound, setInitialRound } from '../../round';
import { skipRound } from './thunks';

export default function useRound() {
    const round = useSelector(selector);
    const dispatch = useDispatch();

    return [
        round,
        {
            setInitialRound() {
                dispatch(setInitialRound());
            },
            skipRound() {
                dispatch(skipRound());
            },
            resetRound() {
                dispatch(resetRound());
            },
        },
    ] as const;
}

function selector(state: RootState) {
    return state.round.slice(-1)[0];
}

import { useDispatch } from 'react-redux';
import { undoHistory } from './thunks';

export default function useUndoHistory() {
    const dispatch = useDispatch();

    return function undoMovement() {
        dispatch(undoHistory());
    };
}

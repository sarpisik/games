import { AppThunk } from '../../../../../../store';
import { setLayout } from '../../../../../pointsLayout';
import { undoMovement } from '../../../../../round';
import { undoHistory } from '../../../../history';

export default (): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { history } = state;
    const { layout, round } = history.slice(-1)[0];

    // undo movement
    dispatch(undoMovement(round));

    // undo layout
    dispatch(setLayout(layout));

    // undo history
    dispatch(undoHistory());
};

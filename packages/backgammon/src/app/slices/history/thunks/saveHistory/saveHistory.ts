import { AppThunk } from '../../../../store';
import { Round } from '../../../round';
import { TrianglesLayout } from '../../../pointsLayout';
import { setHistory } from '../../history';

const saveHistory = (round: Round, layout: TrianglesLayout): AppThunk => (
    dispatch
) => {
    dispatch(setHistory({ round, layout }));
};

export default saveHistory;

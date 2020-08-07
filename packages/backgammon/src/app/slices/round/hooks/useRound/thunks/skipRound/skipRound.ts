import { AppThunk } from '../../../../../../store';
import { skipRoundByTimeOut } from '../../../../../shared';

const skipRound = (): AppThunk => skipRoundByTimeOut;

export default skipRound;

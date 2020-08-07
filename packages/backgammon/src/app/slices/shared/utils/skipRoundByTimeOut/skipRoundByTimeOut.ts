import { setNextRound } from '../../../round';

const skipRoundByTimeOut = (
    dispatch: (arg0: { payload: undefined; type: string }) => void
) => {
    setTimeout(() => {
        dispatch(setNextRound());
    }, 1500);
};

export default skipRoundByTimeOut;

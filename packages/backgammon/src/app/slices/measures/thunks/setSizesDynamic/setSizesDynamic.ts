import { AppThunk } from '../../../../store';
import { setSizes } from '../../measures';
import { calculateSizes } from '../../utils';

const setSizesDynamic: () => AppThunk = () => (dispatch) => {
    const sizes = calculateSizes();
    dispatch(setSizes(sizes));
};

export default setSizesDynamic;

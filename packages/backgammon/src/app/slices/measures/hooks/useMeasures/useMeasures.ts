import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useMeasures() {
    const measures = useSelector(selector);

    return measures;
}

function selector(state: RootState) {
    return state.measures;
}

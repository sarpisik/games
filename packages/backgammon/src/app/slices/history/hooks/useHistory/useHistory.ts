import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useHistory() {
    const history = useSelector(selector);

    return [history] as const;
}

function selector(state: RootState) {
    return state.history.slice(-1)[0];
}

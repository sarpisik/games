import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useShortTimer() {
    const shortTimer = useSelector(selector);

    return shortTimer;
}

function selector(state: RootState) {
    return state.shortTimer;
}

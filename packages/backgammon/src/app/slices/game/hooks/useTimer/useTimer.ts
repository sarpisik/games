import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useTimer() {
    const timer = useSelector(selector);

    return timer;
}

function selector(state: RootState) {
    return state.game.timer;
}

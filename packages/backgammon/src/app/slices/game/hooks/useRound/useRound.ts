import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useRound() {
    const round = useSelector(selector);

    return round;
}

function selector(state: RootState) {
    return state.game.rounds.slice(-1)[0];
}

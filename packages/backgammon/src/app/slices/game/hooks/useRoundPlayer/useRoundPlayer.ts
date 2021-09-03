import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function usePlayers(): RootState['game']['isRoundPlayer'] {
    return useSelector(selector);
}

function selector(state: RootState) {
    return state.game.isRoundPlayer;
}

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function usePlayers(): RootState['game']['players'] {
    return useSelector(selector);
}

function selector(state: RootState) {
    return state.game.players;
}

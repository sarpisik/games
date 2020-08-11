import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { setInitialGame } from '../../game';

export default function useGame() {
    const game = useSelector(selector);
    const dispatch = useDispatch();

    const setGame = (game: Parameters<typeof setInitialGame>[0]) => {
        dispatch(setInitialGame(game));
    };

    return { game, setGame };
}

function selector(state: RootState) {
    return state.game;
}

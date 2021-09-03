import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { editGame } from '../../game';

export default function useGame() {
    const game = useSelector(selector);
    const dispatch = useDispatch();

    const setGame = (game: Parameters<typeof editGame>[0]) => {
        dispatch(editGame(game));
    };

    return { game, setGame };
}

function selector(state: RootState) {
    return state.game;
}

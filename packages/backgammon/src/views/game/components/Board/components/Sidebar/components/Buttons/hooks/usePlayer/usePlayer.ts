import { useDispatch } from 'react-redux';
import { useGame, useUser } from '../../../../../../../../../../app/slices';
import { checkUserIsPlayer } from '../../../../../../../../../../utils';

export default function usePlayer() {
    const dispatch = useDispatch();
    const { user } = useUser();
    const { game } = useGame();

    const { players } = game;
    const playersFull = Object.values(players).every(Boolean);
    const gamePlayer = checkUserIsPlayer(players, user.id);

    return { dispatch, game, gamePlayer, playersFull, user };
}

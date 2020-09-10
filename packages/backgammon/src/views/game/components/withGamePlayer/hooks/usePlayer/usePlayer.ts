import { useDispatch } from 'react-redux';
import { PLAYERS } from 'types/lib/backgammon';
import { useGame, useUser } from '../../../../../../app/slices';

export default function usePlayer() {
    const dispatch = useDispatch();
    const { user } = useUser();
    const { game } = useGame();

    const { players } = game;
    const playersFull = Object.values(players).every(Boolean);
    const gamePlayer =
        players?.[PLAYERS.BLACK]?.id === user.id ||
        players?.[PLAYERS.WHITE]?.id === user.id;

    return { dispatch, game, gamePlayer, playersFull, user };
}

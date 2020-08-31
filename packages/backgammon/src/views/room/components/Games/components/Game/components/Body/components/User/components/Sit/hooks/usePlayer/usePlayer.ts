import { GameClient, PLAYERS } from 'types/lib/backgammon';
import { useUser } from '../../../../../../../../../../../../../../app/slices';
import { useEditGame } from '../../../../../../../../../shared/hooks';

export interface UsePlayerParams {
    gameId: GameClient['id'];
    color: keyof typeof PLAYERS;
}

export default function usePlayer(params: UsePlayerParams): () => void {
    const { gameId, color } = params;

    const { user } = useUser();
    const { game, editGame } = useEditGame(gameId);

    const setPlayer = () => {
        const players = Object.assign({}, game.players, {
            [PLAYERS[color]]: user,
        });
        const payload = Object.assign({}, game, { players });

        editGame(payload);
    };

    return setPlayer;
}

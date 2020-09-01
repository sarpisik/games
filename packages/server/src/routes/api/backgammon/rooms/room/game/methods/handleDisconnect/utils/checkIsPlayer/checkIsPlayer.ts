import { PLAYERS } from '@shared-types/backgammon';
import BackgammonGame from '../../../../game';

export default function checkIsPlayer(
    userId: string,
    players: BackgammonGame['players']
) {
    return (
        players[PLAYERS.BLACK]?.id === userId ||
        players[PLAYERS.WHITE]?.id === userId
    );
}

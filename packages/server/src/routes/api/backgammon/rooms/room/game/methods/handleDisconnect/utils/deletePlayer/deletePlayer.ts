import { PLAYERS } from '@shared-types/backgammon';
import BackgammonGame from '../../../../game';
import { User } from '@shared-backgammon/src/types/user';

export default function deletePlayer(
    userId: User['id'],
    players: BackgammonGame['players']
) {
    if (players[PLAYERS.BLACK]?.id === userId) players[PLAYERS.BLACK] = null;
    else if (players[PLAYERS.WHITE]?.id === userId)
        players[PLAYERS.WHITE] = null;
}

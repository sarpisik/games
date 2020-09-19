import { Game } from 'types/lib/backgammon';
import { User } from 'types/lib/user';

export default function calculateIsRoundPlayer(
    userId: User['id'],
    gamePlayers: Game['players'],
    roundPlayerIndex: Game['rounds'][number]['player']
) {
    const roundPlayerId = gamePlayers[roundPlayerIndex]?.id;
    const isRoundPlayer = userId === roundPlayerId;

    return isRoundPlayer;
}

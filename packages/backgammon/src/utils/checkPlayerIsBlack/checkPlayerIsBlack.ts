import { PLAYERS } from 'types/lib/backgammon';
import { store } from '../../app/store';

type State = ReturnType<typeof store['getState']>;
type User = State['user'];
type Game = State['game'];

export default function checkPlayerIsBlack(
    userId: User['id'],
    players: Game['players'],
    userIsPlayer: boolean
): boolean {
    return userIsPlayer && userId === players[PLAYERS.BLACK]?.id;
}

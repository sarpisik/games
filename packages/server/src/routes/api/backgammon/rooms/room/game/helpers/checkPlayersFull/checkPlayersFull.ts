import BackgammonGame from '../../game';
import { PLAYERS } from '@shared-types/backgammon';

type Players = {
    [PLAYERS.BLACK]: Exclude<BackgammonGame['players'][PLAYERS.BLACK], null>;
    [PLAYERS.WHITE]: Exclude<BackgammonGame['players'][PLAYERS.WHITE], null>;
};

export default function checkPlayersFull(
    players: BackgammonGame['players']
): players is Players {
    return Boolean(players[PLAYERS.BLACK] && players[PLAYERS.WHITE]);
}

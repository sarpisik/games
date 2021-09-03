import BackgammonGame from '../../game';
import { PLAYERS } from '@shared-types/backgammon';

type Players = {
    [PLAYERS.BLACK]: Exclude<BackgammonGame['players'][PLAYERS.BLACK], null>;
    [PLAYERS.WHITE]: Exclude<BackgammonGame['players'][PLAYERS.WHITE], null>;
};

export default function checkUserIsPlayer(
    players: Players,
    userId: Players[keyof Players]['id']
) {
    return Boolean(
        players[PLAYERS.BLACK].id === userId ||
            players[PLAYERS.WHITE].id === userId
    );
}

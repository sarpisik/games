import { Round } from '../../round';
import { PLAYERS } from '@shared-types/backgammon';
import BackgammonGame from '../../game';

export default function initializeGame(
    this: BackgammonGame,
    roundPlayer: Round['player'] = PLAYERS.WHITE
) {
    this._status = 'INITIALIZED';
    this.rounds = [];
    this._initializeRound(roundPlayer);
}

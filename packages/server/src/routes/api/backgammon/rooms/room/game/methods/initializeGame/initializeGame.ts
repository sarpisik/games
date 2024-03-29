import { PLAYERS } from '@shared-types/backgammon';
import BackgammonGame from '../../game';
import { Round } from '../../round';

export default function initializeGame(
    this: BackgammonGame,
    roundPlayer: Round['player'] = PLAYERS.WHITE
) {
    this._initializeRound(roundPlayer);
}

import { OPPONENT, User } from '@shared-types/backgammon';
import { SCORES } from '../../constants';
import BackgammonGame from '../../game';
import { Round } from '../../round';

export default function handlePlayersScore(
    this: BackgammonGame,
    winner: Round['player']
) {
    const mars = this.score[winner] - this.stages > 0;
    const winnerScore = mars ? SCORES.MARS : SCORES.WINNER;

    const winnerId = (this.players[winner] as User).id;
    const loserId = (this.players[OPPONENT[winner]] as User).id;

    this._updatePlayerScore('WIN', winnerId, winnerScore);
    this._updatePlayerScore('LOSE', loserId, SCORES.LOSER);
}

import { EmitGameOver, OPPONENT } from '@shared-types/backgammon';
import { User } from '@shared-types/user';
import { SCORES } from '../../constants';
import BackgammonGame from '../../game';

export default function handlePlayersScore(
    this: BackgammonGame,
    payload: EmitGameOver
) {
    const { winner, lose } = payload;
    const shouldMars = this.score[winner] - this.stages > 0;
    const winnerScore = shouldMars ? SCORES.MARS : SCORES.WINNER;

    const shouldEscape = typeof lose !== 'undefined';
    const loseScore = shouldEscape ? SCORES.ESCAPE : SCORES.LOSER;

    const winnerId = (this.players[winner] as User).id;
    const loserId = lose || (this.players[OPPONENT[winner]] as User).id;

    this._updatePlayerScore({
        action: 'WIN',
        playerId: winnerId,
        _score: winnerScore,
    });
    this._updatePlayerScore({
        action: 'LOSE',
        playerId: loserId,
        _score: loseScore,
    });
}

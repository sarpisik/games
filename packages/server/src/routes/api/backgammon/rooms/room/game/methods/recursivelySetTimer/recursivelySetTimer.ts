import { OPPONENT, PLAYERS } from '@shared-types/backgammon';
import { ONE_SECOND } from '@shared-types/constants';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';
import { verifyRoundPlayer } from '../../helpers';

export default async function recursivelySetTimer(
    this: BackgammonGame,
    latestRoundPlayer: PLAYERS | undefined
) {
    const roundPlayer = this._t;

    if (roundPlayer === latestRoundPlayer && verifyRoundPlayer(roundPlayer)) {
        this.timer[roundPlayer] -= 1;

        if (this.timer[roundPlayer] < 1) {
            // Exit loop on game over.
            const winner = OPPONENT[roundPlayer];
            this.score[winner] = this.stages;
            this._handleGameOver({
                winner,
                score: this.score,
                stages: this.stages,
            });
        } else {
            this._emitNamespace(GAME_EVENTS.TIMER, this.timer);

            this._tRef = setTimeout(() => {
                this._recursivelySetTimer(latestRoundPlayer);
            }, ONE_SECOND);
        }
    }
}

import { EmitScore, OPPONENT } from '@shared-types/backgammon';
import { NOTIFY_DURATION } from '@shared-types/constants';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';
import {
    calculateGameOver,
    calculateMars,
    calculateSkipRound,
    calculateStageOver,
} from '../../helpers';
import { Round } from '../../round';

export default async function handleNextRound(
    this: BackgammonGame,
    round: Round
) {
    const [shouldStageOver, shouldSkipRound] = await Promise.all([
        calculateStageOver(round),
        calculateSkipRound(round),
    ]);

    if (shouldStageOver) {
        const payload = shouldStageOver as EmitScore;
        const { winner } = payload;

        const shouldMars = await calculateMars(winner, round.collected);
        const winnerPoint = shouldMars ? 2 : 1;
        this.score[winner] += winnerPoint;

        this.rounds = [];
        payload.rounds = this.rounds;
        payload.score = this.score;
        payload.stages = this.stages;

        const shouldGameOver = await calculateGameOver(this.stages, this.score);

        if (shouldGameOver) this._setStatus('OVER', payload);
        else {
            this._emitNamespace(GAME_EVENTS.STAGE_OVER, payload);

            setTimeout(() => {
                this._setStatus('INITIALIZED', winner);
            }, NOTIFY_DURATION);
        }
    } else if (shouldSkipRound) {
        this._emitNamespace(GAME_EVENTS.SKIP_ROUND, {
            round,
            message: 'You can not move. Skipping to next round.',
        });

        setTimeout(() => {
            this._handleNextRound(
                new Round(
                    0,
                    round.turn + 1,
                    OPPONENT[round.player],
                    round.brokens,
                    round.collected,
                    round.layout
                )
            );
        }, NOTIFY_DURATION);
    } else {
        // Send round.
        this._emitNextRound(round);
    }
}

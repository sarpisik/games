import { EmitRound } from '@shared-types/backgammon';
import { NOTIFY_DURATION } from '@shared-types/constants';
import { GAME_EVENTS } from '@shared-types/game';
import { InvalidDiceError, InvalidTriangleError } from '@shared/error';
import BackgammonGame from '../../game';
import { findRoundById } from '../../helpers';

export default async function handleRoundCalculate(
    this: BackgammonGame,
    data: EmitRound
) {
    try {
        const { roundId } = data;
        const latestRound = await findRoundById(roundId, this.rounds);
        const result = await latestRound.calculate(data);
        this._handleRoundResult(result, latestRound);
    } catch (error) {
        if (
            error instanceof InvalidDiceError ||
            error instanceof InvalidTriangleError
        ) {
            this._emitNamespace(GAME_EVENTS.ERROR, error.payload);
            setTimeout(() => {
                this._emitNamespace(
                    GAME_EVENTS.REPLACE_ROUND,
                    this.rounds[this.rounds.length - 1]
                );
            }, NOTIFY_DURATION);
        } else this._emitNamespace(GAME_EVENTS.BAD_REQUEST, error.message);
    }
}

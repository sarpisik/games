import { EmitCollectPointRound } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';
import { findRoundById } from '../../helpers';

export default async function handleCollectPoint(
    this: BackgammonGame,
    data: EmitCollectPointRound
) {
    const { roundId } = data;
    const latestRound = await findRoundById(roundId, this.rounds);
    const result = await latestRound.calculateCollectPoint(data);

    // If any point(s) collected, follow the next step.
    // Else, re-send round.
    if (result) this._handleRoundResult(result, latestRound);
    else this._emitNamespace(GAME_EVENTS.REPLACE_ROUND, latestRound);
}

import { EmitBrokenPointRound } from '@shared-types/backgammon';
import BackgammonGame from '../../game';
import { findRoundById } from '../../helpers';

export default async function handleBrokenPoint(
    this: BackgammonGame,
    data: EmitBrokenPointRound
) {
    const { roundId } = data;
    const latestRound = await findRoundById(roundId, this.rounds);
    const result = await latestRound.calculateBrokenPoint(data);
    this._handleRoundResult(result, latestRound);
}

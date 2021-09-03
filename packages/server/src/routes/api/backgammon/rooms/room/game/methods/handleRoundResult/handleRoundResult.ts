import { OPPONENT } from '@shared-types/backgammon';
import BackgammonGame from '../../game';
import { Round } from '../../round';

export default async function handleRoundResult(
    this: BackgammonGame,
    result: Pick<Round, 'brokens' | 'dice' | 'layout'> & {
        collected?: Round['collected'];
    },
    round: Round
) {
    const { brokens, dice, layout } = result;
    const shouldJumpToNextRound = dice.length < 1;

    const nextRoundPlayer = shouldJumpToNextRound
        ? OPPONENT[round.player]
        : round.player;
    const nextRoundDice = shouldJumpToNextRound ? undefined : dice;

    const collected = checkCollectedExist(result.collected)
        ? result.collected
        : round.collected;

    const nextRound = new Round(
        1,
        round.turn + 1,
        nextRoundPlayer,
        brokens,
        collected,
        layout,
        nextRoundDice
    );
    this._handleNextRound(nextRound);
}

function checkCollectedExist(
    tested?: Round['collected']
): tested is Round['collected'] {
    return typeof tested !== 'undefined';
}

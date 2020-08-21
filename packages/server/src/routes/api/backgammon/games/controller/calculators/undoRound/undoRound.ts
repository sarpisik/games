import { Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';

export default async function undoRoundCalculator(rounds: Round[]) {
    const length = rounds.length;

    const roundsNotEmpty = length > 0;

    const playersAreSame = await customPromise(
        () => rounds[length - 1]?.player === rounds[length - 2]?.player
    );

    const shouldUndo = roundsNotEmpty && playersAreSame;

    shouldUndo &&
        (await customPromise(() => {
            rounds.pop();
        }));

    return rounds;
}

import { customPromise } from '@shared/customPromise';
import BackgammonGame from '../../game';

export default async function undoRound(this: BackgammonGame) {
    const { rounds } = this;
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
}

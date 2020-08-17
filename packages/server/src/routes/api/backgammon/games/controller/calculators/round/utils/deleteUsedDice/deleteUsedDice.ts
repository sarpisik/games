import {
    customPromise,
    customPromiseCb,
    customPromiseFindIndex,
} from '@shared/customPromise';
import { InvalidDiceError } from '@shared/error';

export default async function deleteUsedDice(
    dices: number[],
    possibleDices: number[],
    usedDice: number
) {
    const usedDiceIndex = await customPromiseFindIndex(
        possibleDices,
        (possibleDice) => possibleDice === usedDice
    );

    if (usedDiceIndex < 0) throw new InvalidDiceError(usedDice, possibleDices);

    const isDouble = dices[0] === dices[1];
    if (isDouble) {
        await customPromise(() => dices.splice(0, usedDiceIndex + 1));
    } else {
        const usedDiceIsSum = await customPromiseCb(() => usedDiceIndex > 1);
        const start = usedDiceIsSum ? 0 : usedDiceIndex;
        const end = usedDiceIsSum ? usedDiceIndex : 1;
        await customPromiseCb(() => dices.splice(start, end));
    }

    return dices;
}

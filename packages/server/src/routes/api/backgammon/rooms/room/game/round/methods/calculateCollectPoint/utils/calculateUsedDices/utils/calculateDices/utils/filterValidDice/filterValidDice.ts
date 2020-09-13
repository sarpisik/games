import { Round } from '@shared-types/backgammon';
import { customPromiseFilter } from '@shared/customPromise';
import { calculatePossibleDices } from './utils';

export default async function filterValidDice(
    dice: Round['dice'],
    onFilterDice: (dice: number) => boolean
) {
    const possibleDices = await calculatePossibleDices(dice);

    return customPromiseFilter(possibleDices, onFilterDice);
}

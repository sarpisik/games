import { customPromise } from '@shared/customPromise';
import { filterValidDice } from './utils';

export default function calculateDices(dices: number[]) {
    return Promise.all([
        customPromise(() => dices[0] === dices[1]),
        filterPossibleDices(dices),
    ]);
}

function filterPossibleDices(validDices: number[]) {
    return filterValidDice(validDices, onFilterPossibleDice);
}
function onFilterPossibleDice() {
    return true;
}

import { Round } from '@shared-types/backgammon';
import { customPromiseFindIndex } from '@shared/customPromise';

export default function filterValidDice(
    triangleIndex: number,
    dices: Round['dice']
) {
    const findDiceIndex = handleFindIndex(triangleIndex);

    return customPromiseFindIndex(dices, findDiceIndex);
}

function handleFindIndex(triangleIndex: number) {
    return function findIndex(dice: number) {
        return dice - 1 === triangleIndex;
    };
}

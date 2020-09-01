import { Round } from '@shared-types/backgammon';
import { customPromiseEach } from '@shared/customPromise';

export default async function filterMaxDice(dices: Round['dice']) {
    let maxDiceIndex = 0;

    await customPromiseEach(dices, function getHigherDice(dice, i) {
        const prevDice = dices[maxDiceIndex];
        maxDiceIndex = dice > prevDice ? i : maxDiceIndex;
    });

    return maxDiceIndex;
}

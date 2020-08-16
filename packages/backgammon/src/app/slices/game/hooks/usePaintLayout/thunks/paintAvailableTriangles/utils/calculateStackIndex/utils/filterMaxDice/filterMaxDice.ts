import { Round } from 'types/lib/backgammon';

export default function filterMaxDice(dices: Round['dice']) {
    const maxDiceIndex = 0;

    return new Promise<number>((resolve, reject) => {
        recursivelyFilterMaxDice({
            dices,
            maxDiceIndex,
            resolve,
        }).catch(reject);
    });
}

interface Params {
    dices: Round['dice'];
    maxDiceIndex: number;
    resolve: (value: number) => void;
    i?: number;
}

async function recursivelyFilterMaxDice(data: Params) {
    const { dices, maxDiceIndex, resolve, i = 0 } = data;

    if (i >= dices.length) {
        resolve(maxDiceIndex);
    } else {
        const dice = dices[i];
        const prevDice = dices[maxDiceIndex];

        data.maxDiceIndex = dice > prevDice ? i : maxDiceIndex;
        data.i = i + 1;

        setTimeout(() => {
            recursivelyFilterMaxDice(data);
        });
    }
}

import { Round } from 'types/lib/backgammon';

export default function filterValidDice(
    triangleIndex: number,
    dices: Round['dice']
) {
    return new Promise<number>((resolve, reject) => {
        recursivelyFilterValidDice({
            dices,
            triangleIndex,
            resolve,
        }).catch(reject);
    });
}

interface Params {
    dices: Round['dice'];
    triangleIndex: number;
    resolve: (value: number) => void;
    i?: number;
}

async function recursivelyFilterValidDice(data: Params) {
    const { dices, triangleIndex, resolve, i = 0 } = data;

    if (i >= dices.length) {
        resolve(-1);
    } else {
        const dice = dices[i];
        const shouldCollect = dice - 1 === triangleIndex;

        if (shouldCollect) {
            resolve(i);
        } else {
            data.i = i + 1;

            setTimeout(() => {
                recursivelyFilterValidDice(data);
            });
        }
    }
}

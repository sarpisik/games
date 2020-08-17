export default function calculateSumDices(dices: number[]) {
    return new Promise<number>((resolve, reject) => {
        recursivelyCalculateSumDices({ dices, sum: 0, resolve }).catch(reject);
    });
}

interface Params {
    dices: number[];
    sum: number;
    resolve: (value: number) => void;
    i?: number;
}

async function recursivelyCalculateSumDices(params: Params) {
    const { dices, sum, resolve, i = 0 } = params;

    if (i >= dices.length) {
        resolve(sum);
    } else {
        const dice = dices[i];
        params.sum = sum + dice;
        params.i = i + 1;

        setImmediate(() => {
            recursivelyCalculateSumDices(params);
        });
    }
}

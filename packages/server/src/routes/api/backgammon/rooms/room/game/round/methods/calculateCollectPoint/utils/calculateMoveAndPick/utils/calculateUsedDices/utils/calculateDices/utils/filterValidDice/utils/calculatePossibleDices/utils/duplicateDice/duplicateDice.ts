export default function duplicateDice(dice: number, limit: number) {
    return new Promise<number[]>((resolve, reject) => {
        recursivelyDuplicateDice({ dice, dices: [], limit, resolve }).catch(
            reject
        );
    });
}

interface Params {
    dice: number;
    dices: number[];
    limit: number;
    resolve: (value: number[]) => void;
    i?: number;
}

async function recursivelyDuplicateDice(params: Params) {
    const { dice, dices, limit, resolve, i = 1 } = params;

    if (i > limit) {
        resolve(dices);
    } else {
        dices.push(dice * i);
        params.i = i + 1;

        setImmediate(() => {
            recursivelyDuplicateDice(params);
        });
    }
}

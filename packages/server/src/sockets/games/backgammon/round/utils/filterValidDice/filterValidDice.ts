import { PLAYERS, Round } from 'types/lib/backgammon';

export default function filterValidDice(
    triangleIndex: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    dice: Round['dice'],
    trianglesLimit: number
) {
    const validDice: number[] = [];

    return new Promise<Round['dice']>((resolve, reject) => {
        recursivelyFilterValidDice(
            triangleIndex,
            player,
            dice,
            trianglesLimit,
            validDice,
            resolve
        ).catch(reject);
    });
}

async function recursivelyFilterValidDice(
    triangleIndex: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    dices: Round['dice'],
    trianglesLimit: number,
    validDice: number[],
    resolve: (value: Round['dice']) => void,
    diceIndex = 0
) {
    if (diceIndex >= dices.length) {
        resolve(validDice);
    } else {
        const dice = dices[diceIndex];
        const isValidDice =
            player === PLAYERS.WHITE
                ? triangleIndex + dice < trianglesLimit
                : triangleIndex - dice >= 0;
        isValidDice && validDice.push(dice);

        setImmediate(() => {
            recursivelyFilterValidDice(
                triangleIndex,
                player,
                dices,
                trianglesLimit,
                validDice,
                resolve,
                ++diceIndex
            );
        });
    }
}

import { PLAYERS, Round } from '@shared-types/backgammon';
import { calculatePossibleDices } from './utils';

export default async function filterValidDice(
    triangleIndex: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    dice: Round['dice'],
    trianglesLimit: number
) {
    const validDice: number[] = [];
    const possibleDices = await calculatePossibleDices(dice);

    return new Promise<Round['dice']>((resolve, reject) => {
        recursivelyFilterValidDice(
            triangleIndex,
            player,
            possibleDices,
            trianglesLimit,
            validDice,
            resolve
        ).catch(reject);
    });
}

const DICES_MAP = {
    [PLAYERS.WHITE]: (limit: number, startIndex: number, digit: number) =>
        startIndex + digit < limit,
    [PLAYERS.BLACK]: (_limit: number, startIndex: number, digit: number) =>
        startIndex - digit >= 0,
};

async function recursivelyFilterValidDice(
    triangleIndex: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    possibleDices: Round['dice'],
    trianglesLimit: number,
    validDice: number[],
    resolve: (value: Round['dice']) => void,
    diceIndex = 0
) {
    if (diceIndex >= possibleDices.length) {
        resolve(validDice);
    } else {
        const dice = possibleDices[diceIndex];

        const isValidDice = DICES_MAP[player](
            trianglesLimit,
            triangleIndex,
            dice
        );

        isValidDice && validDice.push(dice);

        setImmediate(() => {
            recursivelyFilterValidDice(
                triangleIndex,
                player,
                possibleDices,
                trianglesLimit,
                validDice,
                resolve,
                ++diceIndex
            );
        });
    }
}

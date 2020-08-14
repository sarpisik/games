import { PLAYERS, Round } from '@shared-types/backgammon';

type ValidTriangleIndexes = number[];

export default function filterValidTriangleIndexes(
    validDice: number[],
    startIndex: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    triangles: Round['layout']
) {
    const validTriangleIndexes: ValidTriangleIndexes = [];

    return new Promise<ValidTriangleIndexes>((resolve, reject) => {
        recursivelyFilterValidTriangleIndexes(
            validDice,
            startIndex,
            player,
            triangles,
            validTriangleIndexes,
            resolve
        ).catch(reject);
    });
}

async function recursivelyFilterValidTriangleIndexes(
    validDice: number[],
    startIndex: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    triangles: Round['layout'],
    validTriangleIndexes: number[],
    resolve: (value: ValidTriangleIndexes) => void,
    diceIndex = 0
) {
    if (diceIndex >= validDice.length) {
        resolve(validTriangleIndexes);
    } else {
        const dice = validDice[diceIndex];
        const possibleTriangleIndex = calculatePossibleTriangleIndex(
            player,
            startIndex,
            dice
        );

        const targetTriangle = triangles[possibleTriangleIndex];
        const [owner, points] = targetTriangle;
        const isTaken = owner !== PLAYERS.NONE;
        const isOpponent = isTaken && owner !== player;
        const isBlocked = isOpponent && points > 1;

        !isBlocked && validTriangleIndexes.push(possibleTriangleIndex);

        setImmediate(() => {
            recursivelyFilterValidTriangleIndexes(
                validDice,
                startIndex,
                player,
                triangles,
                validTriangleIndexes,
                resolve,
                ++diceIndex
            );
        });
    }
}

function calculatePossibleTriangleIndex(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    startIndex: number,
    dice: number
) {
    return player === PLAYERS.WHITE ? startIndex + dice : startIndex - dice;
}

import { OPPONENT, PLAYERS, Round } from '@shared-types/backgammon';

export default function calculateAvailableTriangleForBrokens(round: Round) {
    const { layout, player, dice } = round;
    const color = PLAYERS[player];
    const triangles =
        color === 'BLACK' ? layout.slice(-6).reverse() : layout.slice(0, 6);
    const dices = dice.length > 2 ? dice.slice(0, 2) : dice;

    return new Promise<boolean>((resolve, reject) => {
        recursivelyCalculateAvailableTriangle({
            dices,
            triangles,
            player,
            resolve,
        }).catch(reject);
    });
}

interface Params {
    dices: number[];
    triangles: Round['layout'];
    player: Round['player'];
    resolve: (value: boolean) => void;
    i?: number;
}

async function recursivelyCalculateAvailableTriangle(params: Params) {
    const { dices, triangles, player, resolve, i = 0 } = params;

    if (i >= dices.length) {
        resolve(false);
    } else {
        const dice = dices[i];
        const targetTriangle = triangles[dice - 1];
        const [targetPlayer, targetPoints] = targetTriangle;
        const opponentPlayer = OPPONENT[player];
        const shouldAvailable =
            targetPlayer !== opponentPlayer || targetPoints < 2;

        if (shouldAvailable) resolve(true);
        else
            setImmediate(() => {
                params.i = i + 1;
                recursivelyCalculateAvailableTriangle(params);
            });
    }
}

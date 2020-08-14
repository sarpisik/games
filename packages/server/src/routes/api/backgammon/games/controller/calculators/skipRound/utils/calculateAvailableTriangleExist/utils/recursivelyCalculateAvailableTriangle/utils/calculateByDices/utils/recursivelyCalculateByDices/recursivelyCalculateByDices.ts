import { OPPONENT, Round } from '@shared-types/backgammon';

interface RecursivelyCalculateByDicesParams {
    dices: Round['dice'];
    fromTriangleIndex: number;
    roundPlayer: Round['player'];
    triangles: Round['layout'];
    shouldCollect: boolean;
    resolve: (value?: boolean) => void;
    i?: number;
}

export default async function recursivelyCalculateByDices(
    params: RecursivelyCalculateByDicesParams
) {
    const {
        dices,
        fromTriangleIndex,
        roundPlayer,
        triangles,
        shouldCollect,
        resolve,
        i = 0,
    } = params;

    let targetTriangleAvailable = shouldCollect;

    if (i >= dices.length) {
        resolve(targetTriangleAvailable);
    } else {
        const dice = dices[i];
        const targetTriangleIndex = fromTriangleIndex + dice;
        const targetTriangle = triangles[targetTriangleIndex];

        if (targetTriangle) {
            const [targetPlayer, targetPoints] = targetTriangle;

            targetTriangleAvailable =
                targetPlayer !== OPPONENT[roundPlayer] || targetPoints < 2;
        }

        if (targetTriangleAvailable) {
            resolve(true);
        } else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCalculateByDices(params);
            });
        }
    }
}

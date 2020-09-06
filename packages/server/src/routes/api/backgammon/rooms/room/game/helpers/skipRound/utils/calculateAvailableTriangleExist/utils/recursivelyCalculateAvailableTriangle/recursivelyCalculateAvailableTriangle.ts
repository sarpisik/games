import { Round } from '@shared-types/backgammon';
import { calculateByDices } from './utils';

export interface Params {
    triangles: Round['layout'];
    roundPlayer: Round['player'];
    shouldCollect: boolean;
    dices: Round['dice'];
    resolve: (value: boolean) => void;
    i?: number;
}

export default async function recursivelyCalculateAvailableTriangle(
    params: Params
) {
    const {
        triangles,
        roundPlayer,
        shouldCollect,
        dices,
        resolve,
        i = 0,
    } = params;
    const limit = triangles.length;
    if (i >= limit) {
        resolve(false);
    } else {
        let targetTriangleAvailable = false;
        const [player] = triangles[i];
        const roundPlayerTriangle = player === roundPlayer;

        if (roundPlayerTriangle) {
            targetTriangleAvailable = await calculateByDices({
                dices,
                triangles,
                fromTriangleIndex: i,
                roundPlayer,
                shouldCollect,
            });
        }

        if (targetTriangleAvailable) resolve(targetTriangleAvailable);
        else if (
            roundPlayerTriangle &&
            shouldCollect &&
            !isPickable(dices, triangles, limit, roundPlayer)
        )
            resolve(false);
        else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCalculateAvailableTriangle(params);
            });
        }
    }
}

function isPickable(
    dices: number[],
    triangles: Round['layout'],
    limit: number,
    roundPlayer: Round['player']
) {
    return dices.some((dice) => {
        const triangle = triangles[limit - dice];
        return triangle[0] === roundPlayer;
    });
}

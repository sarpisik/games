import { Round } from '@shared-types/backgammon';
import { calculateByDices } from './utils';

export interface Params {
    triangles: Round['layout'];
    roundPlayer: Round['player'];
    dices: Round['dice'];
    resolve: (value: boolean) => void;
    i?: number;
}

export default async function recursivelyCalculateAvailableTriangle(
    params: Params
) {
    const { triangles, roundPlayer, dices, resolve, i = 0 } = params;
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
            });
        }

        if (targetTriangleAvailable) resolve(targetTriangleAvailable);
        else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCalculateAvailableTriangle(params);
            });
        }
    }
}

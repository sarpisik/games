import { Round } from 'types/lib/backgammon';
import { calculateByDices } from './utils';

interface Params {
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

    if (i >= triangles.length) {
        resolve(shouldCollect);
    } else {
        let targetTriangleAvailable = false;

        const [player] = triangles[i];
        if (player === roundPlayer) {
            targetTriangleAvailable = await calculateByDices({
                dices,
                triangles,
                fromTriangleIndex: i,
                roundPlayer,
                shouldCollect,
            });
        }

        if (targetTriangleAvailable) {
            resolve(targetTriangleAvailable);
        } else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCalculateAvailableTriangle(params);
            });
        }
    }
}

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

        const lastDice =
            shouldCollect &&
            !targetTriangleAvailable &&
            dices.find((d) => i + d === limit);

        if (targetTriangleAvailable) {
            resolve(targetTriangleAvailable);
        } else if (typeof lastDice === 'number') {
            const prevTriangleCanNotMove = triangles
                .slice(17, i) // Get area from  farthest collectable triangle to current triangle.
                .some((t) => t[0] === roundPlayer);
            const otherDices = dices.filter((d) => d !== lastDice);
            const isOnlyDice = otherDices.length === 0;

            // If this is the only dice and could not used for movement, quit false.
            // Else, control other dices.
            if (prevTriangleCanNotMove && isOnlyDice) resolve(false);
            else {
                params.dices = otherDices;
                params.i = 0;
                recursivelyCalculateAvailableTriangle(params);
            }
        } else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCalculateAvailableTriangle(params);
            });
        }
    }
}

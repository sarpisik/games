import { Round } from '@routes/api/backgammon/rooms/room/game/round';
import { customPromiseIncludes } from '@shared/customPromise';
import { OPPONENT } from '@shared-types/backgammon';

export interface Params {
    triangles: Round['layout']; // Collectable area triangles
    roundPlayer: Round['player'];
    dices: Round['dice'];
    resolve: (value: boolean) => void;
    i?: number;
}
export default async function recursivelyCalculatePickableTriangle(
    params: Params
) {
    const { triangles, roundPlayer, dices, resolve, i = 0 } = params;

    const limit = triangles.length;

    if (i >= limit) resolve(false);
    else {
        const triangle = triangles[i];
        const [player] = triangle;
        const roundPlayerTriangle = player === roundPlayer;

        const diceOnTriangle = limit - i;
        const pickable =
            roundPlayerTriangle &&
            (await customPromiseIncludes(dices, diceOnTriangle));
        const movable =
            roundPlayerTriangle &&
            !pickable &&
            checkMovable(dices, triangles, OPPONENT[roundPlayer], i);

        if (pickable || movable) resolve(true);
        // Quit falsy if...
        else if (
            // we have doubled dices or just one dice...
            (dices[0] === dices[1] || dices.length === 1) &&
            // which is equal to current triangle and...
            i + dices[0] === limit
        ) {
            const prevTriangles = triangles.slice(0, i);
            const prevTrianglesExist = prevTriangles.length > 0;
            const roundPlayerTriangles =
                prevTrianglesExist &&
                prevTriangles.some((t) => t[0] === roundPlayer);

            // we can not move because it is blocked.
            if (roundPlayerTriangles) resolve(false);
            else {
                params.i = i + 1;

                setImmediate(() => {
                    recursivelyCalculatePickableTriangle(params);
                });
            }
        } else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCalculatePickableTriangle(params);
            });
        }
    }
}

function checkMovable(
    dices: Round['dice'],
    triangles: Round['layout'],
    opponent: Round['player'],
    i: number
) {
    return dices.some((dice) => {
        const targetTriangle = triangles[i + dice];
        if (targetTriangle) {
            const [player, points] = targetTriangle;
            const shouldMovble = player !== opponent || points < 2;
            return shouldMovble;
        }
        // Target is does not exit. So pickable.
        return true;
    });
}

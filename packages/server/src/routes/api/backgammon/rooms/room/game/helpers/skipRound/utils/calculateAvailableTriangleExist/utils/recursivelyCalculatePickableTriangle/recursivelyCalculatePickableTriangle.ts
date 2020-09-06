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

        const diceOnTriangle = i + 1;
        const pickable =
            roundPlayerTriangle &&
            (await customPromiseIncludes(dices, diceOnTriangle));
        const movable =
            roundPlayerTriangle &&
            !pickable &&
            checkMovable(dices, triangles, OPPONENT[roundPlayer], i);

        if (pickable || movable) resolve(true);
        else {
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
        const targetTriangle = triangles[i - dice];
        if (targetTriangle) {
            const [player, points] = targetTriangle;
            const shouldMovble = player !== opponent || points < 2;
            return shouldMovble;
        }
        // Target is does not exit. So pickable.
        return true;
    });
}

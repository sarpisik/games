import { PLAYERS, Round } from '@shared-types/backgammon';

interface Params {
    indexes: { start: number; end: number };
    triangles: Round['layout'];
    player: Round['player'];
    resolve: (value: number) => void;
}

const BREAK_MAP = {
    [PLAYERS.BLACK]: (start: number, end: number) => start <= end,
    [PLAYERS.WHITE]: (start: number, end: number) => start >= end,
};

const NEXT_INDEX_MAP = {
    [PLAYERS.BLACK]: (start: number) => start - 1,
    [PLAYERS.WHITE]: (start: number) => start + 1,
};

export default async function recursivelyFilterFarthestTriangle(
    params: Params
) {
    const { indexes, triangles, player, resolve } = params;
    const { start, end } = indexes;
    const calculateShouldBreak = BREAK_MAP[player];
    let shouldBreak = calculateShouldBreak(start, end);

    if (shouldBreak) {
        resolve(start);
    } else {
        const triangle = triangles[start];
        const [owner] = triangle;

        shouldBreak = owner === player;
        if (shouldBreak) {
            resolve(start);
        } else {
            indexes.start = NEXT_INDEX_MAP[player](start);

            setImmediate(() => {
                recursivelyFilterFarthestTriangle(params);
            });
        }
    }
}

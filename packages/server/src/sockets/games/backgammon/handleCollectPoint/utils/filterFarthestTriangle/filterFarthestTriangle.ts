import { Round, PLAYERS } from 'types/lib/backgammon';

export default function filterFarthestTriangle(
    triangles: Round['layout'],
    player: Round['player']
) {
    const isWhite = player === PLAYERS.WHITE;
    const start = isWhite ? 18 : 5;
    const end = isWhite ? 23 : 0;

    return new Promise<number>((resolve, reject) => {
        recursivelyFilterFarthestTriangle({
            isWhite,
            start,
            end,
            triangles,
            player,
            resolve,
        }).catch(reject);
    });
}

interface Params {
    isWhite: boolean;
    start: number;
    end: number;
    triangles: Round['layout'];
    player: Round['player'];
    resolve: (value: number) => void;
}

async function recursivelyFilterFarthestTriangle(params: Params) {
    const { isWhite, start, end, triangles, player, resolve } = params;
    let shouldBreak = isWhite ? start >= end : start <= end;

    if (shouldBreak) {
        resolve(start);
    } else {
        const triangle = triangles[start];
        const [owner] = triangle;

        shouldBreak = owner === player;
        if (shouldBreak) {
            resolve(start);
        } else {
            params.start = isWhite ? start + 1 : start - 1;

            setImmediate(() => {
                recursivelyFilterFarthestTriangle(params);
            });
        }
    }
}

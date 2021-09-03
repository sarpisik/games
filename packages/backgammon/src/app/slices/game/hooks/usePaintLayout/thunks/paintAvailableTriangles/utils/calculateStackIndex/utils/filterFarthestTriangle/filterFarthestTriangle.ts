import { Round } from 'types/lib/backgammon';

const END = 23;

export default function filterFarthestTriangle(
    triangles: Round['layout'],
    player: Round['player']
) {
    return new Promise<number>((resolve, reject) => {
        recursivelyFilterFarthestTriangle({
            start: 18,
            triangles,
            player,
            resolve,
        }).catch(reject);
    });
}

interface Params {
    start: number;
    triangles: Round['layout'];
    player: Round['player'];
    resolve: (value: number) => void;
}

async function recursivelyFilterFarthestTriangle(params: Params) {
    const { start, triangles, player, resolve } = params;
    let shouldBreak = start >= END;

    if (shouldBreak) resolve(start);
    else {
        const triangle = triangles[start];
        const [owner] = triangle;

        shouldBreak = owner === player;
        if (shouldBreak) resolve(start);
        else {
            params.start = start + 1;

            setTimeout(() => {
                recursivelyFilterFarthestTriangle(params);
            });
        }
    }
}

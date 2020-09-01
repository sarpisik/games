import { Round, PLAYERS } from '@shared-types/backgammon';
import { recursivelyFilterFarthestTriangle } from './utils';

export default function filterFarthestTriangle(
    triangles: Round['layout'],
    player: Round['player']
) {
    const isWhitePlayer = player === PLAYERS.WHITE;
    const start = isWhitePlayer ? 18 : 5;
    const end = isWhitePlayer ? 23 : 0;
    const indexes = generateIndexes(start, end);

    return new Promise<number>((resolve, reject) => {
        recursivelyFilterFarthestTriangle({
            indexes,
            triangles,
            player,
            resolve,
        }).catch(reject);
    });
}

function generateIndexes(start: number, end: number) {
    return { start, end };
}

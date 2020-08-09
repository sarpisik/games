import { PLAYERS } from 'types/lib/backgammon';
import { TrianglesLayout } from '../types/trianglesLayout';

interface Params {
    validDices: number[];
    startIndex: number;
    player: PLAYERS;
    triangles: TrianglesLayout;
}

export default function filterValidTriangleIndexes({
    validDices,
    startIndex,
    player,
    triangles,
}: Params) {
    const isWhite = player === PLAYERS.WHITE;
    const possibleTriangleIndexes = validDices.map((dice) =>
        isWhite ? startIndex + dice : startIndex - dice
    );
    const validTriangleIndexes = possibleTriangleIndexes.filter((i) => {
        const triangle = triangles[i];

        if (triangle) {
            const [owner, points] = triangle;
            const isTaken = owner !== 0;
            const isOpponent = isTaken && owner !== player;
            const isBlocked = isOpponent && points > 1;

            // Return un blocked triangle
            return !isBlocked;
        }

        return false;
    });

    return validTriangleIndexes;
}

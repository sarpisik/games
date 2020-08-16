import { PLAYERS } from 'types/lib/backgammon';
import { TrianglesLayout } from '../types/trianglesLayout';

interface Params {
    validDices: number[];
    startIndex: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    triangles: TrianglesLayout;
}

const DIRECTIONS_MAP = {
    [PLAYERS.WHITE]: (startIndex: number) => (dice: number) =>
        startIndex + dice,
    [PLAYERS.BLACK]: (startIndex: number) => (dice: number) =>
        startIndex - dice,
};

export default function filterValidTriangleIndexes({
    validDices,
    startIndex,
    player,
    triangles,
}: Params) {
    const calculateDirectionFrom = DIRECTIONS_MAP[player];
    const calculatePossibleIndexes = calculateDirectionFrom(startIndex);
    const possibleTriangleIndexes = validDices.map(calculatePossibleIndexes);
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

import { PLAYERS } from '../../../../../../../../../components/Board/constants';
import { TrianglesLayout } from '../../../../../../constants';

export default function filterValidTriangleIndexes(
    validDice: number[],
    startIndex: number,
    player: PLAYERS,
    triangles: TrianglesLayout
) {
    const possibleTriangleIndexes = validDice.map((dice) => {
        if (player === PLAYERS.WHITE) return startIndex + dice;
        return startIndex - dice;
    });
    const validTriangleIndexes = possibleTriangleIndexes.filter((i) => {
        const [owner, points] = triangles[i];
        const isTaken = owner !== 0;
        const isOpponent = isTaken && owner !== player;
        const isBlocked = isOpponent && points > 1;

        // Return un blocked triangle
        return !isBlocked;
    });

    return validTriangleIndexes;
}

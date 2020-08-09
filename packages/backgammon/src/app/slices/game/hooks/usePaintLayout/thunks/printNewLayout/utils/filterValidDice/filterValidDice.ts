import { PLAYERS } from '../../../../../../../../../components/Board/constants';
import { TrianglesLayout } from '../types/trianglesLayout';

export default function filterValidDice(
    startIndex: number,
    player: PLAYERS,
    dice: number[],
    triangles: TrianglesLayout
) {
    const limit = triangles.length;
    const validDice = dice.filter((digit) => {
        if (player === PLAYERS.WHITE) return startIndex + digit < limit;
        return startIndex - digit >= 0;
    });

    return validDice;
}

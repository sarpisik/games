import { Round, NEXT_PLAYER } from '../../../../../../../../app/slices/round';
import { TrianglesLayout } from '../../../../../../../../app/slices/pointsLayout';
import { PLAYERS } from '../../../../../../constants';

export default function calculateAvailableTriangleExist(
    roundPlayer: Round['player'],
    dices: number[],
    layout: TrianglesLayout
) {
    let isValidTriangleExist = false;
    const isPlayerBlack = PLAYERS[roundPlayer] === 'BLACK';
    const triangles = isPlayerBlack ? [...layout].reverse() : layout;
    const limit = triangles.length;

    for (let i = 0; i < limit; i++) {
        const [player] = triangles[i];
        if (player !== roundPlayer) continue;

        const [dice] = dices;
        const targetTriangleIndex = i + dice;
        const targetTriangle = triangles[targetTriangleIndex];

        const [targetPlayer, targetPoints] = targetTriangle;
        const targetTriangleAvailable =
            targetPlayer !== NEXT_PLAYER[roundPlayer] || targetPoints < 2;

        if (targetTriangleAvailable) {
            isValidTriangleExist = true;
            break;
        }
    }

    return isValidTriangleExist;
}

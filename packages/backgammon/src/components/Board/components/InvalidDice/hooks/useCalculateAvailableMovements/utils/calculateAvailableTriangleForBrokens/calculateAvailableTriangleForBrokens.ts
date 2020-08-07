import { TrianglesLayout } from '../../../../../../../../app/slices/pointsLayout';
import { NEXT_PLAYER, Round } from '../../../../../../../../app/slices/round';
import { PLAYERS } from '../../../../../../constants';

export default function calculateAvailableTriangleForBrokens(
    roundPlayer: Round['player'],
    dices: number[],
    layout: TrianglesLayout
) {
    const color = PLAYERS[roundPlayer];
    const triangles =
        color === 'BLACK' ? layout.slice(-6).reverse() : layout.slice(0, 6);

    const isValidTriangleExist = (dices.length > 2
        ? dices.slice(0, 2)
        : dices
    ).some((dice) => {
        const targetTriangle = triangles[dice - 1];
        const [targetPlayer, targetPoints] = targetTriangle;
        const opponentPlayer = NEXT_PLAYER[roundPlayer];

        return targetPlayer !== opponentPlayer || targetPoints < 2;
    });

    return isValidTriangleExist;
}

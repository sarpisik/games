import { Round, PLAYERS, OPPONENT } from 'types/lib/backgammon';

export default function calculateAvailableTriangleExist(round: Round) {
    let isValidTriangleExist = false;

    const { player: roundPlayer, layout, dice: dices } = round;
    const isPlayerBlack = PLAYERS[roundPlayer] === 'BLACK';
    const triangles = isPlayerBlack ? [...layout].reverse() : layout;
    const limit = triangles.length;

    for (let i = 0; i < limit; i++) {
        const [player] = triangles[i];
        if (player !== roundPlayer) continue;

        let targetTriangleAvailable = false;

        const [dice] = dices;
        const targetTriangleIndex = i + dice;
        const targetTriangle = triangles[targetTriangleIndex];

        if (targetTriangle) {
            const [targetPlayer, targetPoints] = targetTriangle;

            targetTriangleAvailable =
                targetPlayer !== OPPONENT[roundPlayer] || targetPoints < 2;
        }
        if (targetTriangleAvailable) {
            isValidTriangleExist = true;
            break;
        }
    }

    return isValidTriangleExist;
}

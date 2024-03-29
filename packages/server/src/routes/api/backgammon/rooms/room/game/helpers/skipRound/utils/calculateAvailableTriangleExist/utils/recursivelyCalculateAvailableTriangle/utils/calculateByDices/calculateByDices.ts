import { OPPONENT, Round } from '@shared-types/backgammon';
import { customPromiseSome } from '@shared/customPromise';

interface CalculateByDicesParams {
    dices: Round['dice'];
    fromTriangleIndex: number;
    roundPlayer: Round['player'];
    triangles: Round['layout'];
}

export default function calculateByDices(params: CalculateByDicesParams) {
    const { dices, fromTriangleIndex, roundPlayer, triangles } = params;

    return customPromiseSome(dices, function onDice(dice) {
        let targetTriangleAvailable = false;
        const targetTriangleIndex = fromTriangleIndex + dice;
        const targetTriangle = triangles[targetTriangleIndex];

        if (targetTriangle) {
            const [targetPlayer, targetPoints] = targetTriangle;

            targetTriangleAvailable =
                targetPlayer !== OPPONENT[roundPlayer] || targetPoints < 2;
        }

        return targetTriangleAvailable;
    });
}

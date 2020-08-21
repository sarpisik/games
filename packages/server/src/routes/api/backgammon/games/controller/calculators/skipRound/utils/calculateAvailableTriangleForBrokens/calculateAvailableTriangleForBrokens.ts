import { OPPONENT, PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise, customPromiseSome } from '@shared/customPromise';

export default async function calculateAvailableTriangleForBrokens(
    round: Round
) {
    const { layout, player, dice } = round;
    const color = PLAYERS[player];
    const triangles = await customPromise(() =>
        color === 'BLACK' ? layout.slice(-6).reverse() : layout.slice(0, 6)
    );
    const dices = dice.length > 2 ? dice.slice(0, 2) : dice;

    return customPromiseSome(dices, function onDice(dice) {
        const targetTriangle = triangles[dice - 1];
        const [targetPlayer, targetPoints] = targetTriangle;
        const opponentPlayer = OPPONENT[player];
        const shouldAvailable =
            targetPlayer !== opponentPlayer || targetPoints < 2;

        return shouldAvailable;
    });
}

import { OPPONENT, PLAYERS, Round } from 'types/lib/backgammon';

export default function calculateAvailableTriangleForBrokens(round: Round) {
    const { layout, player, dice: dices } = round;
    const color = PLAYERS[player];
    const triangles =
        color === 'BLACK' ? layout.slice(-6).reverse() : layout.slice(0, 6);

    const isValidTriangleExist = (dices.length > 2
        ? dices.slice(0, 2)
        : dices
    ).some((dice) => {
        const targetTriangle = triangles[dice - 1];
        const [targetPlayer, targetPoints] = targetTriangle;
        const opponentPlayer = OPPONENT[player];

        return targetPlayer !== opponentPlayer || targetPoints < 2;
    });

    return isValidTriangleExist;
}

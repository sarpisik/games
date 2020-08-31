import { OPPONENT, Round } from '@shared-types/backgammon';
import { customPromiseSome } from '@shared/customPromise';
import { generateArea, transformDices } from './utils';

export default async function calculateAvailableTriangleForBrokens(
    round: Round
): Promise<boolean> {
    const { layout, player, dice } = round;

    const resolves = await Promise.all([
        generateArea(player, layout),
        transformDices(dice),
    ]);

    const [triangles, dices] = resolves;

    return customPromiseSome(dices, function onDice(dice) {
        const targetTriangle = triangles[dice - 1];
        const [targetPlayer, targetPoints] = targetTriangle;
        const opponentPlayer = OPPONENT[player];
        const shouldAvailable =
            targetPlayer !== opponentPlayer || targetPoints < 2;

        return shouldAvailable;
    });
}

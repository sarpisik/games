import {
    EmitBrokenPointRound,
    OPPONENT,
    Round,
} from '@shared-types/backgammon';
import { rollDices } from '../utils';
import { customPromise, customPromiseFindIndex } from '@shared/customPromise';

export default async function brokenPointCalculator(
    data: EmitBrokenPointRound,
    round: Round
) {
    const { color, toTriangleIndex } = data;
    const { dice: dices, layout, player, brokens } = round;

    const triangle = layout[toTriangleIndex];
    const [owner, points] = triangle;

    const opponent = OPPONENT[player];
    const shouldCapture = owner !== player;
    const opponentPointIsBroken = shouldCapture && owner === opponent;

    // Increase opponent broken points
    if (opponentPointIsBroken) {
        brokens[owner as keyof Round['brokens']] += 1;
    }

    // Decrese round player's broken points.
    await customPromise(() => {
        brokens[player] -= 1;
    });

    // Print new layout
    await customPromise(() => {
        layout[toTriangleIndex] = [player, shouldCapture ? 1 : points + 1];
    });

    // Generate new id
    await customPromise(() => {
        round.id = Date.now();
    });

    // Convert triangle index into dice index.
    const dice = await customPromise(() =>
        color === 'BLACK'
            ? // Left bottom corner
              layout.length - toTriangleIndex
            : // Left top corner
              toTriangleIndex + 1
    );
    const usedDiceIndex = await customPromiseFindIndex(
        dices,
        (d) => d === dice
    );

    // Delete used dice
    await customPromise(() => {
        round.dice.splice(usedDiceIndex, 1);
    });

    // Create new round if all dice used.
    const shouldJumpToNextRound = round.dice.length < 1;
    if (shouldJumpToNextRound) {
        round.player = OPPONENT[round.player];
        round.turn += 1;
        round.dice = await rollDices();
    }

    return round;
}

import {
    EmitBrokenPointRound,
    OPPONENT,
    Round,
} from '@shared-types/backgammon';
import { rollDices } from '../utils';

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
    brokens[player] -= 1;

    // Print new layout
    layout[toTriangleIndex] = [player, shouldCapture ? 1 : points + 1];

    // Generate new id
    round.id = Date.now();

    // Convert triangle index into dice index.
    const dice =
        color === 'BLACK'
            ? // Left bottom corner
              layout.length - toTriangleIndex
            : // Left top corner
              toTriangleIndex + 1;
    const usedDiceIndex = dices.indexOf(dice);
    // Delete used dice
    round.dice.splice(usedDiceIndex, 1);

    // Create new round if all dice used.
    const shouldJumpToNextRound = round.dice.length < 1;
    if (shouldJumpToNextRound) {
        round.player = OPPONENT[round.player];
        round.turn += 1;
        round.dice = await rollDices();
    }

    return round;
}
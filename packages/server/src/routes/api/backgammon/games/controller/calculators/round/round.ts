import { EmitRound, OPPONENT, PLAYERS, Round } from '@shared-types/backgammon';
import { rollDices } from '../utils';
import { filterValidDice, filterValidTriangleIndexes } from './utils';

export default async function roundCalculator(data: EmitRound, round: Round) {
    const { fromTriangleIndex, color, toTriangleIndex } = data;
    const { dice, layout } = round;

    const player = PLAYERS[color];
    const validDice = await filterValidDice(
        fromTriangleIndex,
        player,
        dice,
        layout.length
    );
    const validTriangleIndexes = await filterValidTriangleIndexes(
        validDice,
        fromTriangleIndex,
        player,
        layout
    );
    const targetTriangle = layout[toTriangleIndex];
    const [owner, points] = targetTriangle;
    const shouldCapture = owner !== player;

    // Increase opponent broken points
    const opponentPointIsBroken = shouldCapture && owner === OPPONENT[player];
    if (opponentPointIsBroken) {
        round.brokens[owner as keyof Round['brokens']] += 1;
    }

    // Print layout
    const prevTriangle = layout[fromTriangleIndex];
    const updatedPrevTrianglePoints = prevTriangle[1] - 1;
    const isPrevWillBeEmpty = updatedPrevTrianglePoints < 1;

    // Update initial triangle
    layout[fromTriangleIndex] = [
        isPrevWillBeEmpty ? PLAYERS.NONE : prevTriangle[0],
        updatedPrevTrianglePoints,
    ];

    // Update target triangle
    layout[toTriangleIndex] = [player, shouldCapture ? 1 : points + 1];

    // Generate new id
    round.id = Date.now();

    // Delete used dice
    const usedDiceIndex = dice.findIndex((dice) => {
        const delta = Math.abs(toTriangleIndex - fromTriangleIndex);
        return delta === dice;
    });
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

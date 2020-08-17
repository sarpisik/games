import {
    EmitCollectPointRound,
    EVENTS,
    OPPONENT,
    PLAYERS,
    Round,
} from '@shared-types/backgammon';
import { calculateShouldCollect, rollDices } from '../utils';
import {
    filterFarthestTriangle,
    filterMaxDice,
    filterValidDice,
} from './utils';
import { customPromise } from '@shared/customPromise';

export default async function collectPointCalculator(
    data: EmitCollectPointRound,
    round: Round
) {
    const { fromTriangleIndex } = data;
    const { player, layout, dice: dices } = round;
    const shouldCollect = await calculateShouldCollect(player, layout);

    if (shouldCollect) {
        const triangleIndex =
            player === PLAYERS.BLACK
                ? fromTriangleIndex
                : layout.length - 1 - fromTriangleIndex;

        const [
            validDiceIndex,
            farthestTriangleIndex,
            maxDiceIndex,
        ] = await Promise.all([
            filterValidDice(triangleIndex, dices),
            filterFarthestTriangle(layout, player),
            filterMaxDice(dices),
        ]);

        const diceAndTriangleAreEqual = validDiceIndex > -1;
        const shouldCollectable = await customPromise(() => {
            const isFarthestTriangle =
                fromTriangleIndex === farthestTriangleIndex;
            const collectableByHigherDice =
                dices[maxDiceIndex] > triangleIndex + 1;
            const collectable = isFarthestTriangle && collectableByHigherDice;

            return diceAndTriangleAreEqual || collectable;
        });

        if (shouldCollectable) {
            const diceIndex = diceAndTriangleAreEqual
                ? validDiceIndex
                : maxDiceIndex;
            const triangleIndex = diceAndTriangleAreEqual
                ? fromTriangleIndex
                : farthestTriangleIndex;

            const triangle = round.layout[triangleIndex];
            const [owner, points] = triangle;
            const newPoints = points - 1;

            // Paint new layout
            round.layout[triangleIndex] = [
                newPoints < 1 ? PLAYERS.NONE : owner,
                newPoints,
            ];

            // Generate new id
            await customPromise(() => {
                round.id = Date.now();
            });

            // Delete used dice
            await customPromise(() => {
                round.dice.splice(diceIndex, 1);
            });

            // Increase collected points
            round.collected[player] += 1;

            // Create new round if all dice used.
            const shouldJumpToNextRound = round.dice.length < 1;
            if (shouldJumpToNextRound) {
                round.player = OPPONENT[round.player];
                round.turn += 1;
                round.dice = await rollDices();
            }

            return round;
        }

        return generateEvent(round);
    }

    return generateEvent(round);
}

export function shouldSkipRound(
    tested: Round | ReturnType<typeof generateEventPayload>
): tested is ReturnType<typeof generateEventPayload> {
    return Object.prototype.hasOwnProperty.call(tested, 'event');
}

function generateEvent(round: Round) {
    return customPromise(() => generateEventPayload(round));
}

function generateEventPayload(round: Round) {
    return { event: EVENTS.COLLECT_POINT_ROUND, round };
}

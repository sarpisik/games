import io from 'socket.io';
import {
    EmitCollectPointRound,
    EVENTS,
    OPPONENT,
    PLAYERS,
} from 'types/lib/backgammon';
import { handleNextRound } from '../round/utils';
import { calculateShouldCollect, rollDices } from '../utils';
import {
    filterFarthestTriangle,
    filterMaxDice,
    filterValidDice,
} from './utils';

export default function handleCollectPoint(socket: io.Socket) {
    return async function collectPoint(data: EmitCollectPointRound) {
        const { round, fromTriangleIndex } = data;
        const { player, layout, dice: dices } = round;
        const shouldCollect = calculateShouldCollect(player, layout);
        const triangleIndex =
            player === PLAYERS.BLACK
                ? fromTriangleIndex
                : layout.length - 1 - fromTriangleIndex;
        if (shouldCollect) {
            const [
                validDiceIndex,
                farthestTriangleIndex,
                maxDiceIndex,
            ] = await Promise.all([
                filterValidDice(player, triangleIndex, dices),
                filterFarthestTriangle(layout, player),
                filterMaxDice(dices),
            ]);

            const diceAndTriangleAreEqual = validDiceIndex > -1;
            const isFarthestTriangle =
                fromTriangleIndex === farthestTriangleIndex;
            const shouldCollectableByHigherDice =
                dices[maxDiceIndex] > triangleIndex + 1;

            const shouldCollectable =
                diceAndTriangleAreEqual ||
                (isFarthestTriangle && shouldCollectableByHigherDice);

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

                round.layout[triangleIndex] = [
                    newPoints < 1 ? PLAYERS.NONE : owner,
                    newPoints,
                ];
                round.dice.splice(diceIndex, 1);
                round.collected[player] += 1;

                // Create new round if all dice used.
                const shouldJumpToNextRound = round.dice.length < 1;
                if (shouldJumpToNextRound) {
                    round.player = OPPONENT[round.player];
                    round.turn += 1;
                    round.dice = rollDices();
                }

                handleNextRound(socket, round);
            } else {
                socket.emit(EVENTS.COLLECT_POINT_ROUND, round);
            }
        } else {
            socket.emit(EVENTS.COLLECT_POINT_ROUND, round);
        }
    };
}

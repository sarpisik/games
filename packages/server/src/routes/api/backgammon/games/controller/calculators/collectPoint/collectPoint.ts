import {
    EmitCollectPointRound,
    EVENTS,
    PLAYERS,
    Round,
} from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';
import { calculateShouldCollect } from '../utils';
import {
    calculateCollectArea,
    calculateUsedDices,
    filterFarthestTriangle,
    filterMaxDice,
    filterValidDice,
    handleCollect,
    transformCollectAreaIndex,
} from './utils';

type HandleCollectParams = Parameters<typeof handleCollect>[0];

export default async function collectPointCalculator(
    data: EmitCollectPointRound,
    round: Round
) {
    const { fromTriangleIndex } = data;
    const { player, layout, dice: dices } = round;

    const shouldCollect = await calculateShouldCollect(player, layout);

    if (shouldCollect) {
        const triangleIndex = await transformCollectAreaIndex(
            player,
            fromTriangleIndex
        );

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
        const shouldPickable = await customPromise(() => {
            const isFarthestTriangle =
                fromTriangleIndex === farthestTriangleIndex;
            const collectableByHigherDice =
                dices[maxDiceIndex] > triangleIndex + 1;
            const collectable = isFarthestTriangle && collectableByHigherDice;

            return diceAndTriangleAreEqual || collectable;
        });

        if (shouldPickable) {
            const deleteDicesFrom = diceAndTriangleAreEqual
                ? validDiceIndex
                : maxDiceIndex;

            const tIndex = diceAndTriangleAreEqual
                ? triangleIndex
                : await transformCollectAreaIndex(
                      player,
                      farthestTriangleIndex
                  );

            const handleCollectParams = await customPromise(
                (): HandleCollectParams => ({
                    round,
                    triangleIndex: tIndex,
                    deleteDicesFrom,
                    deleteDicesCount: 1,
                    player,
                })
            );

            return handleCollect(handleCollectParams);
        }

        const collectArea = await calculateCollectArea(player, layout);
        const calculateMovableParams = await customPromise(
            (): CalculateMovableParams => ({
                dices,
                layout: collectArea,
                player,
                startIndex: triangleIndex,
            })
        );
        const usedIndexes = await calculateUsedDices(calculateMovableParams);

        const deleteDicesCount = usedIndexes.length;
        const shouldMoveAndPick = deleteDicesCount > 0;
        if (shouldMoveAndPick) {
            const handleCollectParams = await customPromise(
                (): HandleCollectParams => ({
                    round,
                    triangleIndex,
                    deleteDicesFrom: 0,
                    deleteDicesCount,
                    player,
                })
            );

            return handleCollect(handleCollectParams);
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

type CalculateMovableParams = Parameters<typeof calculateUsedDices>[0];

import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromiseLoop } from '@shared/customPromise';
import { calculateTriangleIsBlocked } from '../shared';

export default async function getValidTriangleIndexes(
    triangles: Round['layout'],
    possibleIndexes: number[],
    player: PLAYERS.WHITE | PLAYERS.BLACK
) {
    let isBlockedAlready = false;
    const validTriangles: number[] = [];

    await customPromiseLoop(
        possibleIndexes.length,
        function calculateValidTriangle(i: number, COMMANDS) {
            const tIndex = possibleIndexes[i];
            const { BREAK, CONTINUE } = COMMANDS;

            const triangle = triangles[tIndex];
            if (!triangle) return CONTINUE;

            const triangleIsBlocked = calculateTriangleIsBlocked(
                player,
                triangle
            );
            if (triangleIsBlocked) {
                const isOver =
                    calculateIsOver(i, validTriangles.length) ||
                    isBlockedAlready; // If the prior dice movement already blocked.

                if (isOver) return BREAK;
                // Prevent using of sum dices.
                isBlockedAlready = true;
                return CONTINUE;
            }

            validTriangles.push(tIndex);

            return CONTINUE;
        }
    );

    return validTriangles;
}

function calculateIsOver(i: number, validtrianglesCount: number) {
    return i - validtrianglesCount > 1;
}

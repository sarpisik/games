import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromiseLoop } from '@shared/customPromise';
import { calculateTriangleIsBlocked } from '../shared';

export default async function getValidTrianglesOnDoubleDice(
    triangles: Round['layout'],
    tIndexes: number[],
    player: PLAYERS.WHITE | PLAYERS.BLACK
) {
    const validTriangles: number[] = [];

    await customPromiseLoop(tIndexes.length, function calculateValidTriangle(
        i: number,
        COMMANDS
    ) {
        const tIndex = tIndexes[i];
        const { BREAK, CONTINUE } = COMMANDS;

        const triangle = triangles[tIndex];
        if (!triangle) return BREAK;

        const triangleIsBlocked = calculateTriangleIsBlocked(player, triangle);
        if (triangleIsBlocked) return BREAK;

        validTriangles.push(tIndex);

        return CONTINUE;
    });

    return validTriangles;
}

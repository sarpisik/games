import { customPromiseLoop } from '@shared/customPromise';
import { MovableParams } from '../../shared/types';
import { triangleIsBlocked } from '../../shared/helpers';

export default async function calculatedDoubleDiceMovable(
    params: MovableParams
) {
    const { validDices, layout, startIndex, player } = params;
    let shouldMovable = true;

    await customPromiseLoop(validDices.length - 1, function onLoopTriangleIndex(
        i,
        COMMANDS
    ) {
        const tIndex = validDices[i] - 1;

        const isOverStart = tIndex > startIndex;
        if (isOverStart) return COMMANDS.BREAK;

        const triangle = layout[tIndex];
        const blocked = triangleIsBlocked(player, triangle);
        if (blocked) {
            shouldMovable = false;
            return COMMANDS.BREAK;
        }

        return COMMANDS.CONTINUE;
    });

    return shouldMovable;
}

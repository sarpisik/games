import { customPromiseLoop } from '@shared/customPromise';
import { triangleIsBlocked } from '../../shared/helpers';
import { MovableParams } from '../../shared/types';

export default async function calculateDiceMovable(params: MovableParams) {
    const { validDices, layout, startIndex, player } = params;
    let isBlockedAlready = false;
    let shouldMovable = true;

    await customPromiseLoop(validDices.length - 1, function onLoopTriangleIndex(
        i,
        COMMANDS
    ) {
        const tIndex = validDices[i] - 1;

        const isOverStart = tIndex > startIndex;
        if (isOverStart) {
            shouldMovable = false;
            return COMMANDS.BREAK;
        }

        const triangle = layout[tIndex];
        const blocked = triangleIsBlocked(player, triangle);
        if (blocked) {
            if (isBlockedAlready) {
                shouldMovable = false;
                return COMMANDS.BREAK;
            }

            isBlockedAlready = true;
        }

        return COMMANDS.CONTINUE;
    });

    return shouldMovable;
}

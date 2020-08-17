import { customPromiseLoop } from '@shared/customPromise';

export default async function validateTargetTriangle(
    validTraingleIndexes: number[],
    targetTriangleIndex: number
) {
    let isValid = false;

    await customPromiseLoop(
        validTraingleIndexes.length,
        function onValidateTriangle(i, COMMANDS) {
            const { BREAK, CONTINUE } = COMMANDS;
            const tIndex = validTraingleIndexes[i];
            const targetIsValid = tIndex === targetTriangleIndex;

            if (!targetIsValid) return CONTINUE;

            isValid = true;
            return BREAK;
        }
    );

    return isValid;
}

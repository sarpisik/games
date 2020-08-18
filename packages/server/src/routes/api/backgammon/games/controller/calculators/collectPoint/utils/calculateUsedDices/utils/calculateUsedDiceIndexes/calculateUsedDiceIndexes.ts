import { customPromiseLoop } from '@shared/customPromise';

interface CalculateUsedDicesParams {
    possibleDices: number[];
    isDouble: boolean;
    startIndex: number;
}

export default async function calculateUsedDiceIndexes(
    params: CalculateUsedDicesParams
) {
    const { isDouble, possibleDices, startIndex } = params;
    const usedDiceIndexes: number[] = [];

    await customPromiseLoop(possibleDices.length, function onUsedDice(
        i,
        COMMANDS
    ) {
        const usedDice = possibleDices[i];
        const shouldBreak = isDouble
            ? usedDice > startIndex + 1
            : usedDice >= startIndex;

        if (shouldBreak) return COMMANDS.BREAK;

        usedDiceIndexes.push(i);

        return COMMANDS.CONTINUE;
    });

    return usedDiceIndexes;
}

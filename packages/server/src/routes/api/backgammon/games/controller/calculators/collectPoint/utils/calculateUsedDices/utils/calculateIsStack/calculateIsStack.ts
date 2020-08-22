import { customPromiseIncludes, customPromiseMap } from '@shared/customPromise';

export default async function calculateIsStack(
    startIndex: number,
    possibleDices: number[]
) {
    const calculatePossibleIndexes = handleCalculatePossibleIndexes(startIndex);
    const possibleTriangleIndexes = await customPromiseMap(
        possibleDices,
        calculatePossibleIndexes
    );

    return customPromiseIncludes(possibleTriangleIndexes, -1);
}

function handleCalculatePossibleIndexes(fromTriangle: number) {
    return function calculatePossibleIndexes(dice: number) {
        return fromTriangle - dice;
    };
}

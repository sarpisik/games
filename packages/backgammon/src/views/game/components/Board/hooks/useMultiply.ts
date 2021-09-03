export function useMultiply(numbers: number[]) {
    const result = numbers.reduce(numbersReducer, 1);

    return result;
}

export function numbersReducer(result: number, current: number) {
    return result * current;
}

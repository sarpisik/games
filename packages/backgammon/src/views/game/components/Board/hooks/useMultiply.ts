import { useMemo } from 'react';

export function useMultiply(numbers: number[]) {
    const result = useMemo(() => numbers.reduce(numbersReducer, 1), [numbers]);

    return result;
}

export function numbersReducer(result: number, current: number) {
    return result * current;
}

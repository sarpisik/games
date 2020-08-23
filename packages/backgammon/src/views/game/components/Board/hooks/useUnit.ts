import { useCallback } from 'react';
import { useStoreUnit } from '../../../../../app/slices';

export function useUnit() {
    const unit = useStoreUnit();

    const getUnit = useCallback(
        (target: number, dimension: keyof typeof unit) =>
            target / unit[dimension],
        [unit]
    );
    const getUnitReverse = useCallback(
        (target: number, dimension: keyof typeof unit) =>
            target * unit[dimension],
        [unit]
    );

    return { unit, getUnit, getUnitReverse };
}

import { useCallback } from 'react';
import { useStoreUnit } from '../../../../../app/slices';

export function useUnit() {
    const unit = useStoreUnit();

    const getUnit = useCallback((target: number) => target / unit, [unit]);
    const getUnitReverse = useCallback((target: number) => target * unit, [
        unit,
    ]);

    return { unit, getUnit, getUnitReverse };
}

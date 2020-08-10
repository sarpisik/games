import { useCallback, useState } from 'react';
import { MEASURES } from '../constants';

export function useUnit() {
    const [unit] = useState(MEASURES.UNIT);

    const getUnit = useCallback((target: number) => target / unit, [unit]);
    const getUnitReverse = useCallback((target: number) => target * unit, [
        unit,
    ]);

    return { unit, getUnit, getUnitReverse };
}

import { useMultiply } from './useMultiply';
import { useUnit } from './useUnit';

export default function useUnitMeasure(target: number) {
    const { unit } = useUnit();
    const result = useMultiply([unit, target]);

    return result;
}

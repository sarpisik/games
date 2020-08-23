import { useMultiply } from './useMultiply';
import { useUnit } from './useUnit';

export default function useUnitMeasure(
    target: number,
    dimension: keyof ReturnType<typeof useUnit>['unit']
) {
    const { unit } = useUnit();
    const result = useMultiply([unit[dimension], target]);

    return result;
}

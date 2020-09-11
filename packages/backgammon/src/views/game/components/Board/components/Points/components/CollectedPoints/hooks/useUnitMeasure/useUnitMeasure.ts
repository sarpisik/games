import { numbersReducer } from '../../../../../../hooks/useMultiply';
import { useUnit } from '../../../../../../hooks/useUnit';

export default function useUnitMeasure() {
    const { unit } = useUnit();

    return (
        target: number,
        dimension: keyof ReturnType<typeof useUnit>['unit']
    ) => [unit[dimension], target].reduce(numbersReducer, 1);
}

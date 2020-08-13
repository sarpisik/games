import { useMeasures } from '../useMeasures';

export default function useStoreUnit() {
    const measures = useMeasures();
    const { unit } = measures;

    return unit;
}

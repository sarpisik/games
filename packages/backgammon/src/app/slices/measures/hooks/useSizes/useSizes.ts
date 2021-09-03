import { useMeasures } from '../useMeasures';

export default function useSizes() {
    const measures = useMeasures();
    const { sizes } = measures;

    return sizes;
}

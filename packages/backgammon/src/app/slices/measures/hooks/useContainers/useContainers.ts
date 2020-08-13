import { useMeasures } from '../useMeasures';

export default function useContainers() {
    const measures = useMeasures();
    const { containers } = measures;

    return containers;
}

import { useMeasures } from '../useMeasures';

export default function useBlocks() {
    const measures = useMeasures();
    const { blocks } = measures;

    return blocks;
}

import { useSizes } from '../../../../../../../../app/slices/measures/hooks/useSizes';
import { calculateTriangles } from '../../../../../../../../app/slices/measures/utils';

export default function useTriangles() {
    const sizes = useSizes();
    const triangles = calculateTriangles(sizes);

    return triangles;
}

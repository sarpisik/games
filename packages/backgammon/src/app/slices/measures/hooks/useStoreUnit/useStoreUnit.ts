import { PIXEL } from '../../../../../config';
import { calculateUnit } from '../../utils';
import { useSizes } from '../useSizes';

export default function useStoreUnit() {
    const sizes = useSizes();
    const unit = calculateUnit(sizes, PIXEL);

    return unit;
}

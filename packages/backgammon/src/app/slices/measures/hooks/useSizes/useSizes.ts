import { useDispatch } from 'react-redux';
import { setSizesDynamic } from '../../thunks';
import { useMeasures } from '../useMeasures';
import { useEffect } from 'react';

export default function useNotification() {
    const dispatch = useDispatch();
    const measures = useMeasures();
    const { sizes } = measures;

    useEffect(() => {
        function updateSizesOnResize() {
            dispatch(setSizesDynamic());
        }
        window.addEventListener('resize', updateSizesOnResize);
        return () => {
            window.removeEventListener('resize', updateSizesOnResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return sizes;
}

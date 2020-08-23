import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSizesDynamic } from '../../../../app/slices/measures/thunks';

export default function useDynamicLayout() {
    const dispatch = useDispatch();

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
}

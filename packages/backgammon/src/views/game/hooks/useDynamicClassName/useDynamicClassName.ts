import { useEffect } from 'react';
import { LayoutWrapperProps } from '../../../../components';
import { useDynamicOrientation } from './hooks';

const CLASSNAME = 'flex-wrap';

export default function useDynamicClassName(
    setClassName: LayoutWrapperProps['setClassName']
) {
    const orientation = useDynamicOrientation();

    useEffect(() => {
        const isPortrait = orientation === 'portrait';

        setClassName((_className) => {
            let className = '';

            const isAlreadyWrapped = _className.includes(CLASSNAME);

            if (isPortrait && !isAlreadyWrapped)
                className = _className.concat(' ' + CLASSNAME);
            else if (!isPortrait && isAlreadyWrapped)
                className = _className.replace(' ' + CLASSNAME, '');

            return className || _className;
        });

        // skip dep setClassName
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orientation]);
}

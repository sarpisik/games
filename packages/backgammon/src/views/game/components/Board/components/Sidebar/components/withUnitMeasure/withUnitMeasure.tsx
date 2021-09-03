import React from 'react';
import { useUnitMeasure } from '../../../../hooks';

export interface Props {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function withUnitMeasure<P extends Props>(
    WrappedComponent: React.ComponentType<P>
): (props: P) => React.ReactElement {
    return function WithUnitMeasures(
        _props: React.ComponentProps<typeof WrappedComponent>
    ): React.ReactElement {
        const { x, y, width, height } = _props;

        const props = Object.assign({}, _props, {
            x: useUnitMeasure(x, 'x'),
            y: useUnitMeasure(y, 'y'),
            width: useUnitMeasure(width, 'x'),
            height: useUnitMeasure(height, 'y'),
        });

        return <WrappedComponent {...props} />;
    };
}

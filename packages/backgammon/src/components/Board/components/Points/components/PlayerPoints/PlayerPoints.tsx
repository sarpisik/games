import React from 'react';

import { usePoints } from './hooks';
import { Point } from '../shared/components';

export default function Points(): React.ReactElement {
    const points = usePoints();

    return <React.Fragment>{points.map(Point)}</React.Fragment>;
}

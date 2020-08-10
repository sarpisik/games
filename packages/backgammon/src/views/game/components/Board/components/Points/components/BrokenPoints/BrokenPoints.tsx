import React from 'react';

import { BrokenPoint } from './components';

import { useBrokenPoints } from './hooks';

export default function BrokenPoints(): React.ReactElement {
    const points = useBrokenPoints();

    return <React.Fragment>{points.map(BrokenPoint)}</React.Fragment>;
}

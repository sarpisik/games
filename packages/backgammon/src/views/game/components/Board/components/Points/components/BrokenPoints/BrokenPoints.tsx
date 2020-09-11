import React from 'react';

import { BrokenPoint } from './components';

import { useBrokenPoints } from './hooks';

type Props = Parameters<typeof useBrokenPoints>[0];
export default function BrokenPoints(props: Props): React.ReactElement {
    const points = useBrokenPoints(props);

    return <React.Fragment>{points.map(BrokenPoint)}</React.Fragment>;
}

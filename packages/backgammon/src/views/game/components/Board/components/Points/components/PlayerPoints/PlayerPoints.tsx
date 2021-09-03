import React from 'react';

import { usePoints } from './hooks';
import { Point } from '../shared/components';

type Props = Parameters<typeof usePoints>[0];

export default function Points(props: Props): React.ReactElement {
    const points = usePoints(props);

    return <React.Fragment>{points.map(Point)}</React.Fragment>;
}

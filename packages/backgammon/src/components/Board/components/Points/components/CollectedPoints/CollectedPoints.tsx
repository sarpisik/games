import React from 'react';
import { useCollectedPoints } from './hooks';
import { FilledRectangle } from '../../../FilledRectangle';

export default function CollectedPoints(): React.ReactElement {
    const [blackCollectedPoints, whiteCollectedPoints] = useCollectedPoints();

    return (
        <React.Fragment>
            {blackCollectedPoints.map(FilledRectangle)}
            {whiteCollectedPoints.map(FilledRectangle)}
        </React.Fragment>
    );
}

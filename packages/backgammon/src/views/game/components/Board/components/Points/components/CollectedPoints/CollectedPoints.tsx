/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { CollectedPoint } from './components';
import { useCollectedPoints } from './hooks';

type Props = Parameters<typeof useCollectedPoints>[0];

export default function CollectedPoints(props: Props): React.ReactElement {
    const [blackCollectedPoints, whiteCollectedPoints] = useCollectedPoints(
        props
    );

    return (
        <React.Fragment>
            {blackCollectedPoints.map(CollectedPoint)}
            {whiteCollectedPoints.map(CollectedPoint)}
        </React.Fragment>
    );
}

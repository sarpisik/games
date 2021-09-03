import React from 'react';

import { PlayerPoints, BrokenPoints, CollectedPoints } from './components';

export default function Points(
    props: React.ComponentProps<typeof CollectedPoints>
): React.ReactElement {
    return (
        <React.Fragment>
            <CollectedPoints {...props} />
            <PlayerPoints {...props} />
            <BrokenPoints {...props} />
        </React.Fragment>
    );
}

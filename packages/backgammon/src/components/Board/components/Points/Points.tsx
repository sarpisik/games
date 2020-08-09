import React from 'react';

import { PlayerPoints, BrokenPoints, CollectedPoints } from './components';

export default function Points(): React.ReactElement {
    return (
        <React.Fragment>
            <CollectedPoints />
            <PlayerPoints />
            <BrokenPoints />
        </React.Fragment>
    );
}

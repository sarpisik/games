import React from 'react';

import { PlayerPoints, BrokenPoints } from './components';

export default function Points(): React.ReactElement {
    return (
        <React.Fragment>
            <PlayerPoints />
            <BrokenPoints />
        </React.Fragment>
    );
}

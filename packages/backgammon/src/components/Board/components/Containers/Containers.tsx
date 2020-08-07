import React from 'react';

import { LAYOUTS } from '../../constants';
import { FilledRectangle } from '../FilledRectangle';

export default function Containers() {
    return (
        <React.Fragment>
            {LAYOUTS.CONTAINERS.map(FilledRectangle)}
        </React.Fragment>
    );
}

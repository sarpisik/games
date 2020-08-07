import React from 'react';

import { LAYOUTS } from '../../constants';
import { FilledRectangle } from '../FilledRectangle';

export default function Blocks() {
    return (
        <React.Fragment>{LAYOUTS.BLOCKS.map(FilledRectangle)}</React.Fragment>
    );
}

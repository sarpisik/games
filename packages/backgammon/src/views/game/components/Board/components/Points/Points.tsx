import React from 'react';

import { PlayerPoints, BrokenPoints, CollectedPoints } from './components';
import pointLight from '../../../../../../../src/assets/point_light.png';
import pointDark from '../../../../../../../src/assets/point_dark.png';
import useImage from 'use-image';

export default function Points() {
    const [pLight] = useImage(pointLight);
    const [pDark] = useImage(pointDark);

    if (pLight && pDark) {
        // Will be accessible by drag start event handler
        pLight.dataset.color = 'WHITE';
        pDark.dataset.color = 'BLACK';

        return (
            <React.Fragment>
                <CollectedPoints pLight={pLight} pDark={pDark} />
                <PlayerPoints pLight={pLight} pDark={pDark} />
                <BrokenPoints pLight={pLight} pDark={pDark} />
            </React.Fragment>
        );
    }

    console.error('Failed to load point(s) assets');
    return null;
}

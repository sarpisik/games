import React from 'react';

import { Layer, useStrictMode } from 'react-konva';
import useImage from 'use-image';

import {
    Basement,
    Blocks,
    Containers,
    Triangles,
    Frame,
    Points,
    Notification,
} from './components';

import pointLight from '../../../../assets/point_light.png';
import pointDark from '../../../../assets/point_dark.png';

useStrictMode(true);

export default function Board() {
    const [pLight, sLight] = useImage(pointLight);
    const [pDark, sDark] = useImage(pointDark);

    if (pLight && pDark) {
        // Will be accessible by drag start event handler
        pLight.dataset.color = 'WHITE';
        pDark.dataset.color = 'BLACK';

        return (
            <Frame>
                <Layer>
                    <Basement />
                    <Containers />
                    <Blocks />
                    <Triangles />
                    <Points pLight={pLight} pDark={pDark} />
                    <Notification />
                </Layer>
            </Frame>
        );
    }

    if (sLight === 'failed')
        console.error('Failed to load assets ' + pointLight);
    if (sDark === 'failed') console.error('Failed to load assets ' + pointDark);

    return null;
}

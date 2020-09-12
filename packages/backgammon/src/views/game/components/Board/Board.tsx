import React from 'react';
import { Layer, useStrictMode } from 'react-konva';
import { PLAYERS } from 'types/lib/backgammon';
import useImage from 'use-image';
import pointDark from '../../../../assets/point_dark.png';
import pointLight from '../../../../assets/point_light.png';
import {
    Basement,
    Blocks,
    Containers,
    Frame,
    Notification,
    Points,
    Sidebar,
    Triangles,
} from './components';

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
                    <Sidebar
                        images={{
                            [PLAYERS.BLACK]: pDark,
                            [PLAYERS.WHITE]: pLight,
                        }}
                    />
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

import React from 'react';

import { Layer, useStrictMode } from 'react-konva';

import {
    Basement,
    Blocks,
    Containers,
    Triangles,
    Frame,
    Points,
    Notification,
} from './components';

useStrictMode(true);

export default function Board(): React.ReactElement {
    return (
        <Frame>
            <Layer>
                <Basement />
                <Containers />
                <Blocks />
                <Triangles />
                <Points />
                <Notification />
            </Layer>
        </Frame>
    );
}

import React from 'react';
import { Layer, useStrictMode } from 'react-konva';
import { PLAYERS } from 'types/lib/backgammon';
import {
    Basement,
    Containers,
    Frame,
    Notification,
    Points,
    Sidebar,
    Triangles,
} from './components';
import { allElements, useLoadAssets } from './hooks';

useStrictMode(true);

export default function Board() {
    const [assets, allSuccess, someFailed] = useLoadAssets();

    if (allSuccess && allElements(assets)) {
        const [pLight, pDark, ...dices] = assets;
        // Will be accessible by drag start event handler
        pLight.dataset.color = 'WHITE';
        pDark.dataset.color = 'BLACK';

        return (
            <Frame>
                <Layer>
                    <Basement />
                    <Containers />
                    <Triangles />
                    <Points pLight={pLight} pDark={pDark} />
                    {/*
                    <Sidebar
                        images={{
                            [PLAYERS.BLACK]: pDark,
                            [PLAYERS.WHITE]: pLight,
                            dices,
                        }}
                    />
                    */}
                    <Notification />
                </Layer>
            </Frame>
        );
    }

    if (someFailed) {
        console.error('Some assets failed to load.');
        console.error(assets);

        return <p>Sorry, board can not be initialized rgit now.</p>;
    }

    return <p>Loading assets. Please wait...</p>;
}

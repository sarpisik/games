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
        const [points, dices, buttons] = assets;
        const [pLight, pDark] = points;
        // Will be accessible by drag start event handler
        pLight.dataset.color = 'WHITE';
        pDark.dataset.color = 'BLACK';

        const cycleIcon = buttons[7];

        return (
            <Frame>
                <Layer>
                    <Basement />
                    <Containers />
                    <Triangles />
                    <Points pLight={pLight} pDark={pDark} />

                    <Sidebar
                        images={{
                            [PLAYERS.BLACK]: pDark,
                            [PLAYERS.WHITE]: pLight,
                            dices,
                            buttons: {
                                resume: generateBtnProps(
                                    buttons[0],
                                    buttons[1]
                                ),
                                start: generateBtnProps(buttons[2], buttons[3]),
                                surrender: generateBtnProps(
                                    buttons[4],
                                    buttons[5]
                                ),
                                undo: generateBtnProps(buttons[6], cycleIcon),
                            },
                        }}
                    />

                    <Notification image={cycleIcon} />
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

function generateBtnProps<I>(bg: I, icon: I) {
    return { bg, icon };
}

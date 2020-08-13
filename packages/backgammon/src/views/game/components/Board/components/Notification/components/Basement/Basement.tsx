import React from 'react';
import { Rect } from 'react-konva';
import { useSizes } from '../../../../../../../../app/slices/measures';

export default function Basement(): React.ReactElement {
    const sizes = useSizes();
    const { BOARD_WIDTH, BOARD_HEIGHT } = sizes;

    return (
        <Rect
            x={0}
            y={0}
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            fill="rgba(0,0,0,0.5)"
        />
    );
}

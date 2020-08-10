import React from 'react';
import { Rect } from 'react-konva';
import { SIZES } from '../../../../constants';

const { BOARD_WIDTH, BOARD_HEIGHT } = SIZES;

export default function Basement(): React.ReactElement {
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

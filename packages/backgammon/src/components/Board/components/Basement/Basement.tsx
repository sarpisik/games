import React from 'react';

import { Rect } from 'react-konva';

import { COLORS, SIZES } from '../../constants';

const { BOARD_WIDTH, BOARD_HEIGHT } = SIZES;
const { BOARD_BORDER } = COLORS;

export default function Basement(): React.ReactElement {
    return (
        <Rect
            x={0}
            y={0}
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            fill={BOARD_BORDER}
        />
    );
}

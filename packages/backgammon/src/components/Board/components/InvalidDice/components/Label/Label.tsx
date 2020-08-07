import React, { ReactElement } from 'react';
import { Text } from 'react-konva';
import { SIZES } from '../../../../constants';

const { BOARD_WIDTH, BOARD_HEIGHT } = SIZES;

export default function Label(): ReactElement {
    return (
        <Text
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            fill="#ffffff"
            align="center"
            verticalAlign="middle"
            fontSize={50}
            text="You can not move. Skipping to next round."
        />
    );
}

import React, { ReactElement } from 'react';
import { Text } from 'react-konva';
import { SIZES } from '../../../../constants';

const { BOARD_WIDTH, BOARD_HEIGHT } = SIZES;

interface LabelProps {
    text: string;
}

export default function Label(props: LabelProps): ReactElement {
    const { text } = props;

    return (
        <Text
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            fill="#ffffff"
            align="center"
            verticalAlign="middle"
            fontSize={50}
            text={text}
        />
    );
}

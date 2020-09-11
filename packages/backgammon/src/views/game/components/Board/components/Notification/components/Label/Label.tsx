import React from 'react';
import { Text } from 'react-konva';
import { useSizes } from '../../../../../../../../app/slices/measures';

interface LabelProps {
    text: string;
}

export default function Label(props: LabelProps): React.ReactElement {
    const { text } = props;
    const sizes = useSizes();

    const { BOARD_WIDTH, BOARD_HEIGHT } = sizes;

    return (
        <Text
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            fill="#ffffff"
            align="center"
            verticalAlign="middle"
            fontSize={setDyanmicFontSize(BOARD_HEIGHT)}
            text={text}
        />
    );
}

function setDyanmicFontSize(boardHeight: number) {
    return boardHeight * 0.05;
}

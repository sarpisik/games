import React from 'react';
import { Text } from 'react-konva';
import { useSizes } from '../../../../../../app/slices/measures';

export default function Label(
    props: React.ComponentProps<typeof Text>
): React.ReactElement {
    const { fontSize, ..._props } = props;

    const sizes = useSizes();
    const { BOARD_HEIGHT } = sizes;

    return (
        <Text
            fontSize={setDyanmicFontSize(BOARD_HEIGHT, fontSize)}
            {..._props}
        />
    );
}

function setDyanmicFontSize(boardHeight: number, fontSize = 0.05) {
    return boardHeight * fontSize;
}

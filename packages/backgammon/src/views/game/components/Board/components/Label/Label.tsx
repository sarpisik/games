import React from 'react';
import { Text } from 'react-konva';
import { useSizes } from '../../../../../../app/slices/measures';

interface LabelProps extends React.ComponentProps<typeof Text> {
    text: string;
}

export default function Label(props: LabelProps): React.ReactElement {
    const { text, fontSize, ..._props } = props;

    const sizes = useSizes();
    const { BOARD_HEIGHT } = sizes;

    return (
        <Text
            fontSize={setDyanmicFontSize(BOARD_HEIGHT, fontSize)}
            text={text}
            {..._props}
        />
    );
}

function setDyanmicFontSize(boardHeight: number, fontSize = 0.05) {
    return boardHeight * fontSize;
}

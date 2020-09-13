import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { useSizes } from '../../../../../../app/slices/measures';
// import { COLORS } from '../../../../../../config';
import board from '../../../../../../assets/board.png';

// const { BOARD_BORDER } = COLORS;

export default function Basement(): React.ReactElement {
    const sizes = useSizes();
    const { BOARD_WIDTH, BOARD_HEIGHT } = sizes;
    const [image] = useImage(board);

    return (
        <Image
            x={0}
            y={0}
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            image={image}
        />
    );
    // return (
    //     <Rect
    //         x={0}
    //         y={0}
    //         width={BOARD_WIDTH}
    //         height={BOARD_HEIGHT}
    //         fill={BOARD_BORDER}
    //     />
    // );
}

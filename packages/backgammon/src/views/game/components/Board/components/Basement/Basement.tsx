import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { useSizes } from '../../../../../../app/slices/measures';
import board from '../../../../../../assets/board.png';

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
}

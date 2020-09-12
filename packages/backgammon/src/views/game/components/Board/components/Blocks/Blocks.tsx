import React from 'react';
import { useBlocks } from '../../../../../../app/slices';
import { COLORS } from '../../../../../../config';
import { FilledRectangle } from '../FilledRectangle';

export default function Blocks(): React.ReactElement {
    const blocks = useBlocks();

    // @ts-ignore
    return blocks.map(FilledRectangle);
}

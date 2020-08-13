import React from 'react';
import { useBlocks } from '../../../../../../app/slices';
import { FilledRectangle } from '../FilledRectangle';

export default function Blocks() {
    const blocks = useBlocks();

    return <React.Fragment>{blocks.map(FilledRectangle)}</React.Fragment>;
}

import React from 'react';
import { SquareImage } from '../../../../../shared';

export default function Dice(
    props: React.ComponentProps<typeof SquareImage>
): React.ReactElement {
    return <SquareImage {...props} />;
}

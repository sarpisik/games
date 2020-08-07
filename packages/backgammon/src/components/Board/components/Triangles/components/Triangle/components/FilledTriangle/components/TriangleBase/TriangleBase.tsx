import React from 'react';
import { Line } from 'react-konva';
import { useUnitMeasure } from '../../../../../../../../hooks';

type TriangleProps = Omit<
    React.ComponentProps<typeof Line>,
    'points' | 'closed'
>;

export default function TriangleBase({
    x = 1,
    y = 1,
    width = 1,
    height = 1,
    ...rectProps
}: TriangleProps): React.ReactElement {
    const posX = useUnitMeasure(x);
    const posY = useUnitMeasure(y);
    const sizeX = useUnitMeasure(width);
    const sizeY = useUnitMeasure(height);
    const points = React.useMemo(() => [0, 0, sizeX, 0, sizeX / 2, sizeY], [
        sizeX,
        sizeY,
    ]);

    return <Line x={posX} y={posY} points={points} closed {...rectProps} />;
}

import React, { ReactElement } from 'react';
import { useRound } from '../../../../../../app/slices';
import { LAYOUTS } from '../../constants';
import { TriangleEven, TriangleHighlight, TriangleOdd } from './components';
import { isEven } from './lib';

export default function Triangles(): ReactElement {
    return (
        <React.Fragment>{LAYOUTS.TRIANGLES.map(RenderTriangle)}</React.Fragment>
    );
}

function RenderTriangle(
    props: typeof LAYOUTS.TRIANGLES[number],
    index: number
) {
    const round = useRound();

    const shouldHightlight = round?.availableTriangles?.includes(index);
    if (shouldHightlight) return <TriangleHighlight {...props} />;

    return isEven(index) ? (
        <TriangleEven {...props} />
    ) : (
        <TriangleOdd {...props} />
    );
}

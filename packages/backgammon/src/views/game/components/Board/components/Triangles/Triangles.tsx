import React from 'react';
import { useRound } from '../../../../../../app/slices';
import { LAYOUTS } from '../../constants';
import { TriangleEven, TriangleHighlight, TriangleOdd } from './components';
import { useTriangles } from './hooks';
import { isEven } from './lib';

export default function Triangles(): React.ReactElement {
    const triangles = useTriangles();

    return <React.Fragment>{triangles.map(RenderTriangle)}</React.Fragment>;
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

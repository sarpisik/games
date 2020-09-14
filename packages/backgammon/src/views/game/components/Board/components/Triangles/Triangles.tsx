import React from 'react';
import { useRound } from '../../../../../../app/slices';
import { TriangleHighlight } from './components';
import { useTriangles } from './hooks';

export default function Triangles(): React.ReactElement {
    const triangles = useTriangles();

    return <React.Fragment>{triangles.map(RenderTriangle)}</React.Fragment>;
}

function RenderTriangle(
    props: ReturnType<typeof useTriangles>[number],
    index: number
) {
    const round = useRound();

    const shouldHightlight = round?.availableTriangles?.includes(index);
    if (shouldHightlight) return <TriangleHighlight {...props} />;
    return null;
}

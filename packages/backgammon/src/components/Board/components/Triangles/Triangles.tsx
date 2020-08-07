import React, { ReactElement } from 'react';
import { LAYOUTS } from '../../constants';
import { TriangleEven, TriangleOdd } from './components';
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
    return isEven(index) ? (
        <TriangleEven {...props} />
    ) : (
        <TriangleOdd {...props} />
    );
}

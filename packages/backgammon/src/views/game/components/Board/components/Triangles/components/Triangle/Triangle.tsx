import React from 'react';
import { FilledTriangle } from './components';

type ColoredTriangleType = React.ComponentProps<typeof FilledTriangle>;

export const TriangleHighlight: React.FC<ColoredTriangleType> = (props) => (
    <FilledTriangle {...props} />
);

export const TriangleEven: React.FC<ColoredTriangleType> = (props) => (
    <FilledTriangle {...props} />
);

export const TriangleOdd: React.FC<ColoredTriangleType> = (props) => (
    <FilledTriangle {...props} />
);

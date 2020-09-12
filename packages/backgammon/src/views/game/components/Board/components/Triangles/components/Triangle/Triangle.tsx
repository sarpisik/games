import React from 'react';
import { COLORS } from '../../../../../../../../config';
import { FilledTriangle } from './components';

type ColoredTriangleType = Omit<
    React.ComponentProps<typeof FilledTriangle>,
    'color'
>;

export const TriangleHighlight: React.FC<ColoredTriangleType> = (props) => (
    <FilledTriangle strokeWidth={0} color={COLORS.HIGHLIGHT} {...props} />
);

export const TriangleEven: React.FC<ColoredTriangleType> = (props) => (
    <FilledTriangle stroke="black" color={COLORS.EVEN} {...props} />
);

export const TriangleOdd: React.FC<ColoredTriangleType> = (props) => (
    <FilledTriangle color={COLORS.ODD} {...props} />
);

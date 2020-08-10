import React from 'react';
import { FilledTriangle } from './components';
import { COLORS } from './constants';

type ColoredTriangleType = Omit<
    React.ComponentProps<typeof FilledTriangle>,
    'color'
>;

export const TriangleEven: React.FC<ColoredTriangleType> = (props) => (
    <FilledTriangle stroke="black" color={COLORS.EVEN} {...props} />
);

export const TriangleOdd: React.FC<ColoredTriangleType> = (props) => (
    <FilledTriangle color={COLORS.ODD} {...props} />
);

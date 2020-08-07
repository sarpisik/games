import React from 'react';
import { TriangleBase } from './components';
import { COLORS } from './constants';

type TriangleBaseProps = React.ComponentProps<typeof TriangleBase>;
interface FilledTriangleProps extends Omit<TriangleBaseProps, 'fill'> {
    color: TriangleBaseProps['fill'];
}

export default function FilledTriangle({
    color,
    ...rectProps
}: FilledTriangleProps): React.ReactElement {
    return <TriangleBase fill={color} stroke={COLORS.BORDER} {...rectProps} />;
}

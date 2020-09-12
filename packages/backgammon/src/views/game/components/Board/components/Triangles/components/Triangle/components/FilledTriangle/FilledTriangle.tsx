import React from 'react';
import { COLORS } from '../../../../../../../../../../config';
import { TriangleBase } from './components';

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

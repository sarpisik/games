import React from 'react';

import { Circle } from './components';

type CircleProps = React.ComponentProps<typeof Circle>;

export interface FilledPointProps extends Omit<CircleProps, 'fill'> {
    color: CircleProps['fill'];
}
export default function Point(props: FilledPointProps): React.ReactElement {
    const { color, ...circleProps } = props;

    return <Circle fill={color} stroke="black" {...circleProps} />;
}

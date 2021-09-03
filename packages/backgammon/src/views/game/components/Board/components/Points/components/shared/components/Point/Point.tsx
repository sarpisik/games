import React from 'react';
import { Circle } from './components';

type CircleProps = React.ComponentProps<typeof Circle>;

export type FilledPointProps = Omit<CircleProps, 'fill'>;

export default function Point(props: FilledPointProps): React.ReactElement {
    return <Circle {...(props as CircleProps)} />;
}

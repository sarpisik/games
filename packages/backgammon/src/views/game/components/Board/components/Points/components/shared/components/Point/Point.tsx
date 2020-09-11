import React from 'react';
import { Circle } from './components';

export type FilledPointProps = Omit<
    React.ComponentProps<typeof Circle>,
    'fill'
>;
export default function Point(props: FilledPointProps): React.ReactElement {
    return <Circle {...props} />;
}

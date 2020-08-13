import React from 'react';
import { useContainers } from '../../../../../../app/slices';
import { FilledRectangle } from '../FilledRectangle';

export default function Containers() {
    const containers = useContainers();

    return <React.Fragment>{containers.map(FilledRectangle)}</React.Fragment>;
}

import React from 'react';
import { useContainers } from '../../../../../../app/slices';
import { FilledRectangle } from '../FilledRectangle';

export default function Containers(): React.ReactElement {
    const containers = useContainers();

    // @ts-ignore
    return containers.map(FilledRectangle);
}

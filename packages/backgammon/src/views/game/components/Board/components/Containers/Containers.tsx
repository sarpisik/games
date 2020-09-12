import React from 'react';
import { useContainers } from '../../../../../../app/slices';
import { COLORS } from '../../../../../../config';
import { FilledRectangle } from '../FilledRectangle';

export default function Containers() {
    const containers = useContainers();

    return (
        <React.Fragment>
            {containers
                .map((container) => ({
                    ...container,
                    color: COLORS.BOARD_INNER,
                }))
                .map(FilledRectangle)}
        </React.Fragment>
    );
}

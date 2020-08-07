import React from 'react';
import { Point } from '../../../shared/components';
import { BrokenPointProps } from '../../shared/types';
import { Label } from './components';

export default function BrokenPoint(
    props: BrokenPointProps
): React.ReactElement {
    const { key, label, ...pointProps } = props;

    return (
        <React.Fragment key={key}>
            <Label {...label} />
            <Point {...pointProps} />
        </React.Fragment>
    );
}

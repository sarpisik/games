import React from 'react';
import { Point } from '../../../shared/components';
import { BrokenPointProps } from '../../shared/types';

export default function BrokenPoint(
    props: BrokenPointProps
): React.ReactElement {
    const { key, ...pointProps } = props;

    return <Point key={key} {...pointProps} />;
}

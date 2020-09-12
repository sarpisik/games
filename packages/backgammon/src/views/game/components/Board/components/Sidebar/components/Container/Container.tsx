import React from 'react';
import { useMeasures } from '../../../../../../../../app/slices/measures';
import { FilledRectangle } from '../../../FilledRectangle';

export default function Container(): React.ReactElement {
    const measures = useMeasures();
    const { sidebar } = measures;

    return <FilledRectangle {...sidebar} />;
}

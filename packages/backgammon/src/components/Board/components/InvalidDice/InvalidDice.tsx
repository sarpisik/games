import React from 'react';
import { Basement, Label } from './components';
import { useCalculateAvailableMovements } from './hooks';
import { useRound } from '../../../../app/slices';

export default function InvalidDice(): React.ReactElement | null {
    const round = useRound();

    // Check validality only if round not over.
    return round?.dice.length > 0 ? <Invalid /> : null;
}

function Invalid() {
    const shouldSkipRound = useCalculateAvailableMovements();

    return shouldSkipRound ? (
        <React.Fragment>
            <Basement />
            <Label />
        </React.Fragment>
    ) : null;
}

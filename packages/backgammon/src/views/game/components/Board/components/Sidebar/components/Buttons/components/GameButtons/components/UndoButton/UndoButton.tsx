import React from 'react';
import { useUndoHistory } from '../../../../../../../../../../../../app/slices';
import { Button } from '../../../shared';

export default function UndoButton(
    props: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'offsetIndex'>
): React.ReactElement {
    const [isUndo, undoHistory] = useUndoHistory();

    return (
        <Button
            disabled={!isUndo}
            onClick={undoHistory}
            offsetIndex={2}
            {...props}
        />
    );
}

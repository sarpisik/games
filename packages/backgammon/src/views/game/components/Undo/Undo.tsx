import React from 'react';
import { useUndoHistory } from '../../../../app/slices';

export default function Undo() {
    const [isUndo, status, undoHistory] = useUndoHistory();

    return status === 'INITIALIZED' ? (
        <button disabled={!isUndo} onClick={undoHistory}>
            undo
        </button>
    ) : null;
}

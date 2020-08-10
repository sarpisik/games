import React from 'react';
import { useUndoHistory } from '../../../../app/slices';

export default function Undo(): React.ReactElement {
    const [isUndo, undoHistory] = useUndoHistory();

    return (
        <button disabled={!isUndo} onClick={undoHistory}>
            undo
        </button>
    );
}

import React from 'react';
import { useUndoHistory } from '../../../../app/slices';
import { withGamePlayer } from '../withGamePlayer';

export default withGamePlayer(Undo);

function Undo() {
    const [isUndo, status, undoHistory] = useUndoHistory();

    return status === 'INITIALIZED' ? (
        <button disabled={!isUndo} onClick={undoHistory}>
            undo
        </button>
    ) : null;
}

import React from 'react';
import { useHistory } from '../../app/slices';
import { useUndoHistory } from '../../app/slices/history';
import { useRound } from '../../app/slices/round';

export default function Undo(): React.ReactElement {
    const [history] = useHistory();
    const [round] = useRound();
    const undoHistory = useUndoHistory();

    const disabled = history?.round.id !== round?.id;

    return (
        <button disabled={disabled} onClick={undoHistory}>
            undo
        </button>
    );
}

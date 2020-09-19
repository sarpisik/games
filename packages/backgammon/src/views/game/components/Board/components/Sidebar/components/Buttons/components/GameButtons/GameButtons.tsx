import React from 'react';
import { useUndoHistory } from '../../../../../../../../../../app/slices';
import { SurrenderButton, UndoButton } from './components';

interface Props {
    undo: React.ComponentProps<typeof UndoButton>;
    surrender: React.ComponentProps<typeof SurrenderButton>;
}

export default function GameButtons(props: Props): React.ReactElement {
    const { undo, surrender } = props;
    const [isUndo] = useUndoHistory();

    if (isUndo)
        return (
            <React.Fragment>
                <UndoButton {...undo} />
                <SurrenderButton {...surrender} />
            </React.Fragment>
        );

    return <SurrenderButton {...surrender} />;
}

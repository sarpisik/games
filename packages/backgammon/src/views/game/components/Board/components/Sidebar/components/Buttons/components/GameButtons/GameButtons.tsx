import React from 'react';
import { useUndoHistory } from '../../../../../../../../../../app/slices';
import { SurrenderButton, UndoButton } from './components';

interface Props {
    undo: React.ComponentProps<typeof UndoButton>;
    surrender: Omit<
        React.ComponentProps<typeof SurrenderButton>,
        'offsetIndex'
    >;
}

export default function GameButtons(props: Props): React.ReactElement {
    const { undo, surrender } = props;
    const [isUndo] = useUndoHistory();

    if (isUndo)
        return (
            <React.Fragment>
                <UndoButton {...undo} />
                <SurrenderButton offsetIndex={3} {...surrender} />
            </React.Fragment>
        );

    return <SurrenderButton offsetIndex={1} {...surrender} />;
}

import React from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { GameClient } from 'types/lib/backgammon';
import { ModalContext } from '../../../../../../contexts/Modal';

interface SettingsProps {
    gameId: GameClient['id'];
}

export default function Settings(props: SettingsProps): React.ReactElement {
    const context = React.useContext(ModalContext);
    const { setOpen } = context;

    // @ts-ignore
    return <AiTwotoneSetting onClick={setOpen(props.gameId)} />;
}

import React from 'react';
import Button from 'react-bootstrap/Button';
import usePlayer, { UsePlayerParams } from './hooks/usePlayer/usePlayer';
import { Trans } from 'react-i18next';

export default function Sit(props: UsePlayerParams): React.ReactElement {
    const setPlayer = usePlayer(props);

    return (
        <Button className="text-capitalize" onClick={setPlayer} block>
            <Trans i18nKey="gameSettings.sit" />
        </Button>
    );
}

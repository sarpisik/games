import React from 'react';
import Button from 'react-bootstrap/Button';
import usePlayer, { UsePlayerParams } from './hooks/usePlayer/usePlayer';

export default function Sit(props: UsePlayerParams): React.ReactElement {
    const setPlayer = usePlayer(props);

    return (
        <Button onClick={setPlayer} block>
            Sit
        </Button>
    );
}

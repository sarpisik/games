import React from 'react';
import Button from 'react-bootstrap/Button';
import { GameClient, PLAYERS } from 'types/lib/backgammon';
import usePlayer, { UsePlayerParams } from './hooks/usePlayer/usePlayer';

interface SitProps {
    gameId: GameClient['id'];
    color: keyof typeof PLAYERS;
}

export default function Sit(props: UsePlayerParams): React.ReactElement {
    const setPlayer = usePlayer(props);

    return (
        <Button onClick={setPlayer} block>
            Sit
        </Button>
    );
}

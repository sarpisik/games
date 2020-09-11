import React from 'react';
import { usePlayer } from '../withGamePlayer/hooks';
import { StartButton, SurrenderButton, ResumeButton } from './components';

export default function Buttons() {
    const { gamePlayer, game, playersFull } = usePlayer();

    if (gamePlayer && playersFull)
        switch (game._status) {
            case 'UNINITIALIZED':
            case 'START':
                return <StartButton children="Start" />;

            case 'OVER':
                return <StartButton children="Restart" />;

            case 'INITIALIZED':
                return <SurrenderButton />;

            default:
                console.error(
                    `Invalid game status to render button. Received ${game._status}.`
                );
                return null;
        }
    else if (game._status === 'INITIALIZED' && !playersFull)
        return <ResumeButton />;
    else return null;
}

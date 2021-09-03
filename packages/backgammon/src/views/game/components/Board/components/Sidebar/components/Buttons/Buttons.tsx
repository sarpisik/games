import React from 'react';
import { GameButtons, ResumeButton, StartButton } from './components';
import { Button } from './components/shared';
import { usePlayer } from './hooks';

type Image = React.ComponentProps<typeof Button>['bg'];

interface Props {
    buttons: {
        resume: ButtonImages;
        start: ButtonImages;
        surrender: ButtonImages;
        undo: ButtonImages;
    };
}

interface ButtonImages {
    bg: Image;
    icon: Image;
}

export default function Buttons(props: Props): React.ReactElement {
    const { buttons } = props;
    const { resume, start, ..._buttons } = buttons;
    const { gamePlayer, game, playersFull } = usePlayer();

    if (gamePlayer && playersFull)
        switch (game._status) {
            case 'UNINITIALIZED':
            case 'START':
            case 'OVER':
                return <StartButton {...start} />;

            case 'INITIALIZED':
            case 'SURRENDER':
                return <GameButtons {..._buttons} />;

            default:
                console.error(
                    `Invalid game status to render button. Received ${game._status}.`
                );
                // @ts-ignore
                return null;
        }
    else if (game._status === 'INITIALIZED' && !playersFull && !gamePlayer)
        return <ResumeButton {...resume} />;
    // @ts-ignore
    else return null;
}

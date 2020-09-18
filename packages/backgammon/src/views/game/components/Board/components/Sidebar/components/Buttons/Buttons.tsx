import React from 'react';
import { OFFSETS } from '../../../../../../../../configs';
import { usePlayer } from '../../../../../withGamePlayer/hooks';
import { ResumeButton, StartButton, SurrenderButton } from './components';
import { Button } from './components/shared';

interface Props {
    backgrounds: Array<React.ComponentProps<typeof Button>['image']>;
}

const { BTN } = OFFSETS;

export default function Buttons(props: Props): React.ReactElement {
    const { backgrounds } = props;
    const [startBg, surrenderBg, resumeBg] = backgrounds;
    const { gamePlayer, game, playersFull } = usePlayer();

    if (gamePlayer && playersFull)
        switch (game._status) {
            case 'UNINITIALIZED':
            case 'START':
            case 'OVER':
                return <StartButton image={startBg} {...BTN} />;

            case 'INITIALIZED':
            case 'SURRENDER':
                return <SurrenderButton image={surrenderBg} {...BTN} />;

            default:
                console.error(
                    `Invalid game status to render button. Received ${game._status}.`
                );
                // @ts-ignore
                return null;
        }
    else if (game._status === 'INITIALIZED' && !playersFull && !gamePlayer)
        return <ResumeButton image={resumeBg} {...BTN} />;
    // @ts-ignore
    else return null;
}

import React from 'react';
import { PLAYERS } from 'types/lib/backgammon';
import { usePlayerIndex } from '../../../../../../hooks';
import { Buttons, Dices, Player } from './components';

type PlayerProps = React.ComponentProps<typeof Player>;
type ImageElement = PlayerProps['pointImage'];

interface Props {
    images: {
        [PLAYERS.BLACK]: ImageElement;
        [PLAYERS.WHITE]: ImageElement;
        dices: ImageElement[];
        buttons: React.ComponentProps<typeof Buttons>['buttons'];
    };
}

export default function Sidebar(props: Props): React.ReactElement {
    const { images } = props;
    const { getPlayerIndex } = usePlayerIndex();

    return (
        <React.Fragment>
            <Player
                player={PLAYERS.BLACK}
                dynamicIndex={getPlayerIndex(PLAYERS.WHITE)}
                pointImage={images[PLAYERS.BLACK]}
            />
            <Dices images={images.dices} />
            <Player
                player={PLAYERS.WHITE}
                dynamicIndex={getPlayerIndex(PLAYERS.BLACK)}
                pointImage={images[PLAYERS.WHITE]}
            />
            <Buttons buttons={images.buttons} />
        </React.Fragment>
    );
}

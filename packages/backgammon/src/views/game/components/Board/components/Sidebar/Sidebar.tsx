import React from 'react';
import { PLAYERS } from 'types/lib/backgammon';
import { OFFSETS } from '../../../../../../configs';
import { Buttons, Dices, Player } from './components';

type PlayerProps = React.ComponentProps<typeof Player>;
type ImageElement = Exclude<PlayerProps['point']['image'], undefined>;

interface Props {
    images: {
        [PLAYERS.BLACK]: ImageElement;
        [PLAYERS.WHITE]: ImageElement;
        dices: ImageElement[];
        btnBackgrounds: ImageElement[];
    };
}

export default function Sidebar(props: Props): React.ReactElement {
    const { images } = props;

    return (
        <React.Fragment>
            <Player
                point={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].POINT,
                    { image: images[PLAYERS.BLACK] }
                )}
                score={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].SCORE,
                    { player: PLAYERS.BLACK as const }
                )}
                shortTimer={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].SHORT_TIMER,
                    { player: PLAYERS.BLACK as const }
                )}
                timer={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].TIMER,
                    { player: PLAYERS.BLACK as const }
                )}
                name={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].NAME,
                    { player: PLAYERS.BLACK as const }
                )}
            />
            <Dices images={images.dices} />
            <Player
                point={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].POINT,
                    { image: images[PLAYERS.WHITE] }
                )}
                score={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].SCORE,
                    { player: PLAYERS.WHITE as const }
                )}
                shortTimer={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].SHORT_TIMER,
                    { player: PLAYERS.WHITE as const }
                )}
                timer={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].TIMER,
                    { player: PLAYERS.WHITE as const }
                )}
                name={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].NAME,
                    { player: PLAYERS.WHITE as const }
                )}
            />
            <Buttons backgrounds={images.btnBackgrounds} />
        </React.Fragment>
    );
}

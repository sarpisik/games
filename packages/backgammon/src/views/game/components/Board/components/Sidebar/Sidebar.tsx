import React from 'react';
import { PLAYERS } from 'types/lib/backgammon';
import { useGame } from '../../../../../../app/slices';
import { OFFSETS } from '../../../../../../config';
import { Container, Player } from './components';

type PlayerProps = React.ComponentProps<typeof Player>;

interface Props {
    images: {
        [PLAYERS.BLACK]: PlayerProps['point']['image'];
        [PLAYERS.WHITE]: PlayerProps['point']['image'];
    };
}

export default function Sidebar(props: Props): React.ReactElement {
    const { images } = props;
    const { game } = useGame();
    const { score, players } = game;

    return (
        <React.Fragment>
            <Container />
            <Player
                container={OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].CONTAINER}
                col1={OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].COL_1}
                point={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].POINT,
                    { image: images[PLAYERS.BLACK] }
                )}
                score={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].SCORE,
                    { score: score[PLAYERS.BLACK] }
                )}
                name={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.BLACK].NAME,
                    { name: players[PLAYERS.BLACK]?.name }
                )}
            />
            <Player
                container={OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].CONTAINER}
                col1={OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].COL_1}
                point={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].POINT,
                    { image: images[PLAYERS.WHITE] }
                )}
                score={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].SCORE,
                    { score: score[PLAYERS.WHITE] }
                )}
                name={Object.assign(
                    {},
                    OFFSETS.PLAYER_LABELS[PLAYERS.WHITE].NAME,
                    { name: players[PLAYERS.WHITE]?.name }
                )}
            />
        </React.Fragment>
    );
}

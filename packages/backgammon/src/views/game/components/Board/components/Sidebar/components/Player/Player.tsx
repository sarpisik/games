import React from 'react';
import { Round } from 'types/lib/backgammon';
import { OFFSETS } from '../../../../../../../../configs';
import { Circle } from '../../../Points/components/shared/components/Point/components';
import { Name, Score, ShortTimer, Timer } from './components';

type PointProps = React.ComponentProps<typeof Circle>;

interface Props {
    player: Round['player'];
    pointImage: Exclude<PointProps['image'], undefined>;
}

export default function Player(props: Props): React.ReactElement {
    const { player, pointImage } = props;

    return (
        <React.Fragment>
            <Circle
                image={pointImage}
                {...OFFSETS.PLAYER_LABELS[player].POINT}
            />
            <Score player={player} {...OFFSETS.PLAYER_LABELS[player].SCORE} />
            <Name player={player} {...OFFSETS.PLAYER_LABELS[player].NAME} />
            <ShortTimer
                player={player}
                {...OFFSETS.PLAYER_LABELS[player].SHORT_TIMER}
            />
            <Timer player={player} {...OFFSETS.PLAYER_LABELS[player].TIMER} />
        </React.Fragment>
    );
}

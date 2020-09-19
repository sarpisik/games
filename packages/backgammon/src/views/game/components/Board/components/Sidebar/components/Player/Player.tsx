import React from 'react';
import { Round } from 'types/lib/backgammon';
import { OFFSETS } from '../../../../../../../../configs';
import { Circle } from '../../../Points/components/shared/components/Point/components';
import {
    Highscore,
    Name,
    Score,
    ScorePoint,
    ShortTimer,
    Timer,
} from './components';

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
            <Score player={player} />
            <Name player={player} />
            <Highscore player={player} />
            <ScorePoint player={player} scoreKey="wins" />
            <ScorePoint player={player} scoreKey="loses" />
            <ScorePoint player={player} scoreKey="escapes" />
            <ShortTimer player={player} />
            <Timer player={player} />
        </React.Fragment>
    );
}

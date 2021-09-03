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
    dynamicIndex: Round['player'];
}

export default function Player(props: Props): React.ReactElement {
    const { player, pointImage, dynamicIndex } = props;

    return (
        <React.Fragment>
            <Circle
                image={pointImage}
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].POINT}
            />
            <Score
                player={player}
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].SCORE}
            />
            <Name
                player={player}
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].NAME}
            />
            <Highscore
                player={player}
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].HIGHSCORE}
            />
            <ScorePoint
                player={player}
                scoreKey="wins"
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].SCORE_POINTS.wins}
            />
            <ScorePoint
                player={player}
                scoreKey="loses"
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].SCORE_POINTS.loses}
            />
            <ScorePoint
                player={player}
                scoreKey="escapes"
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].SCORE_POINTS.escapes}
            />
            <ShortTimer
                player={player}
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].SHORT_TIMER}
            />
            <Timer
                player={player}
                {...OFFSETS.PLAYER_LABELS[dynamicIndex].TIMER}
            />
        </React.Fragment>
    );
}

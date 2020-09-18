import React from 'react';
import { Circle } from '../../../Points/components/shared/components/Point/components';
import { Name, Score, ShortTimer, Timer } from './components';

type PointProps = React.ComponentProps<typeof Circle>;
type ScoreProps = React.ComponentProps<typeof Score>;
type NameProps = React.ComponentProps<typeof Name>;
type ShortTimerProps = React.ComponentProps<typeof ShortTimer>;
type TimerProps = React.ComponentProps<typeof Timer>;

interface Props {
    point: PointProps;
    score: ScoreProps;
    name: NameProps;
    shortTimer: ShortTimerProps;
    timer: TimerProps;
}

export default function Player(props: Props): React.ReactElement {
    const { point, score, name, shortTimer, timer } = props;

    return (
        <React.Fragment>
            <Circle {...point} />
            <Score {...score} />
            <Name {...name} />
            <ShortTimer {...shortTimer} />
            <Timer {...timer} />
        </React.Fragment>
    );
}

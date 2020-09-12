import React from 'react';
import { FilledRectangle } from '../../../FilledRectangle';
import { Name, Point, Score } from './components';

type ReactangleProps = React.ComponentProps<typeof FilledRectangle>;
type PointProps = React.ComponentProps<typeof Point>;
type ScoreProps = React.ComponentProps<typeof Score>;
type NameProps = React.ComponentProps<typeof Name>;

interface Props {
    container: ReactangleProps;
    col1: ReactangleProps;
    point: PointProps;
    score: ScoreProps;
    name: NameProps;
}

export default function Player(props: Props): React.ReactElement {
    const { container, col1, point, score, name } = props;

    return (
        <React.Fragment>
            <FilledRectangle {...container} />
            <FilledRectangle
                calculation={{ width: 'y', height: 'y' }}
                {...col1}
            />
            <Point {...point} />
            <Score {...score} />
            <Name {...name} />
        </React.Fragment>
    );
}

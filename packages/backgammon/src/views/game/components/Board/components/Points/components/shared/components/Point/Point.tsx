import React from 'react';

import { Circle } from './components';
import { PLAYERS } from 'types/lib/backgammon';

const COLORS = {
    [PLAYERS[PLAYERS.BLACK]]: PLAYERS[PLAYERS.WHITE],
    [PLAYERS[PLAYERS.WHITE]]: PLAYERS[PLAYERS.BLACK],
};

type CircleProps = React.ComponentProps<typeof Circle>;

export interface FilledPointProps extends Omit<CircleProps, 'fill'> {
    color: CircleProps['fill'];
}

export default function Point(props: FilledPointProps): React.ReactElement {
    const { color, ...circleProps } = props;

    return (
        <Circle
            fill={color}
            stroke={COLORS[color]}
            strokeWidth={0.5}
            {...circleProps}
        />
    );
}

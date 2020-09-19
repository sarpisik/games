import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useTimer } from '../../../../../../../../../../app/slices';
import {
    OFFSETS,
    SIDEBAR_FONT_SIZE,
} from '../../../../../../../../../../configs';
import { addZero } from '../../../../../../../../../../utils';
import { Label } from '../../../../../Label';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
}

// @ts-ignore
const EnhancedLabel = withUnitMeasure<React.ComponentProps<typeof Label>>(
    (props) => (
        <Label
            fill="#ffffff"
            align="center"
            verticalAlign="middle"
            fontSize={SIDEBAR_FONT_SIZE}
            {...props}
        />
    )
);

export default function Timer(props: Props): React.ReactElement {
    const { player } = props;

    const timer = useTimer();
    const _time = timer[player];

    const minute = getMinute(_time);
    const second = getSecond(_time);

    const time = `${minute}:${second}`;

    return (
        <EnhancedLabel text={time} {...OFFSETS.PLAYER_LABELS[player].TIMER} />
    );
}

function getMinute(t: number) {
    return addZero(Math.floor((t % 3600) / 60));
}

function getSecond(t: number) {
    return addZero(Math.floor((t % 3600) % 60));
}

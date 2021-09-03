import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useTimer } from '../../../../../../../../../../app/slices';
import { SIDEBAR_FONT_SIZE } from '../../../../../../../../../../configs';
import { addZero } from '../../../../../../../../../../utils';
import { BoldLabel } from '../../../../../shared';
import { Props, withUnitMeasure } from '../../../withUnitMeasure';

interface TimerProps extends Props {
    player: Round['player'];
}

export default withUnitMeasure<TimerProps>(function Timer(_props) {
    const { player, ...props } = _props;

    const timer = useTimer();
    const _time = timer[player];

    const minute = getMinute(_time);
    const second = getSecond(_time);

    const time = `${minute}:${second}`;

    return (
        <BoldLabel
            fill="#ffffff"
            align="center"
            verticalAlign="middle"
            fontSize={SIDEBAR_FONT_SIZE}
            text={time}
            {...props}
        />
    );
});

function getMinute(t: number) {
    return addZero(Math.floor((t % 3600) / 60));
}

function getSecond(t: number) {
    return addZero(Math.floor((t % 3600) % 60));
}

import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useTimer } from '../../../../../../../../../../app/slices';
import { SIDEBAR_FONT_SIZE } from '../../../../../../../../../../configs';
import { addZero } from '../../../../../../../../../../utils';
import { Label } from '../../../../../Label';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
    x: number;
    y: number;
    width: number;
    height: number;
}

export default withUnitMeasure(Timer);

function Timer(_props: Props): React.ReactElement {
    const { player, ...props } = _props;

    const timer = useTimer();
    const _time = timer[player];

    const minute = getMinute(_time);
    const second = getSecond(_time);

    const time = `${minute}:${second}`;

    return (
        <Label
            fill="#ffffff"
            align="center"
            verticalAlign="middle"
            text={time}
            fontSize={SIDEBAR_FONT_SIZE}
            {...props}
        />
    );
}

function getMinute(t: number) {
    return addZero(Math.floor((t % 3600) / 60));
}

function getSecond(t: number) {
    return addZero(Math.floor((t % 3600) % 60));
}

import React from 'react';
import { Round } from 'types/lib/backgammon';
import { SHORT_TIMER } from 'types/lib/constants';
import {
    useRound,
    useShortTimer,
} from '../../../../../../../../../../app/slices';
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

export default withUnitMeasure(ShortTimer);

function ShortTimer(_props: Props): React.ReactElement {
    const { player, ...props } = _props;

    const round = useRound();
    const shortTimer = useShortTimer();

    const roundPlayer = player === round?.player;
    const shortTimerSecond = roundPlayer
        ? addZero(shortTimer.seconds)
        : SHORT_TIMER;

    return (
        <Label
            fill="#000000"
            align="center"
            verticalAlign="middle"
            text={shortTimerSecond.toString()}
            fontSize={SIDEBAR_FONT_SIZE}
            {...props}
        />
    );
}

import React from 'react';
import { Round } from 'types/lib/backgammon';
import { SHORT_TIMER } from 'types/lib/constants';
import {
    useRound,
    useShortTimer,
} from '../../../../../../../../../../app/slices';
import { SIDEBAR_FONT_SIZE } from '../../../../../../../../../../configs';
import { addZero } from '../../../../../../../../../../utils';
import { BoldLabel } from '../../../../../shared';
import { Props, withUnitMeasure } from '../../../withUnitMeasure';

interface ShortTimerProps extends Props {
    player: Round['player'];
}

export default withUnitMeasure<ShortTimerProps>(function ShortTimer(_props) {
    const { player, ...props } = _props;

    const round = useRound();
    const shortTimer = useShortTimer();

    const roundPlayer = player === round?.player;
    const shortTimerSecond = roundPlayer
        ? addZero(shortTimer.seconds)
        : SHORT_TIMER;

    return (
        <BoldLabel
            text={shortTimerSecond.toString()}
            fill="#000000"
            align="center"
            verticalAlign="middle"
            fontSize={SIDEBAR_FONT_SIZE}
            {...props}
        />
    );
});

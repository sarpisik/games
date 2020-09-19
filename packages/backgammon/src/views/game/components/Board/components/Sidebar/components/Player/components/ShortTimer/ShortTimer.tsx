import React from 'react';
import { Round } from 'types/lib/backgammon';
import { SHORT_TIMER } from 'types/lib/constants';
import {
    useRound,
    useShortTimer,
} from '../../../../../../../../../../app/slices';
import {
    OFFSETS,
    SIDEBAR_FONT_SIZE,
} from '../../../../../../../../../../configs';
import { addZero } from '../../../../../../../../../../utils';
import { BoldLabel } from '../../../../../shared';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
}

// @ts-ignore
const EnhancedLabel = withUnitMeasure<React.ComponentProps<typeof BoldLabel>>(
    (props) => (
        <BoldLabel
            fill="#000000"
            align="center"
            verticalAlign="middle"
            fontSize={SIDEBAR_FONT_SIZE}
            {...props}
        />
    )
);

export default function ShortTimer(props: Props): React.ReactElement {
    const { player } = props;

    const round = useRound();
    const shortTimer = useShortTimer();

    const roundPlayer = player === round?.player;
    const shortTimerSecond = roundPlayer
        ? addZero(shortTimer.seconds)
        : SHORT_TIMER;

    return (
        <EnhancedLabel
            text={shortTimerSecond.toString()}
            {...OFFSETS.PLAYER_LABELS[player].SHORT_TIMER}
        />
    );
}

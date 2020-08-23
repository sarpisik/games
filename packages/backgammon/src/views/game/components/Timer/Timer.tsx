import React from 'react';
import { useRound, useShortTimer, useTimer } from '../../../../app/slices';

export default function Timer(): React.ReactElement {
    const shortTimer = useShortTimer();
    const timer = useTimer();
    const round = useRound();
    const time = timer[round?.player];

    const shortTimerSecond = leadZero(shortTimer.seconds);
    const minute = getMinute(time);
    const second = getSecond(time);

    return (
        <p>
            {minute}:{second} ({shortTimerSecond})
        </p>
    );
}

function getMinute(t: number) {
    return leadZero(Math.floor((t % 3600) / 60));
}

function getSecond(t: number) {
    return leadZero(Math.floor((t % 3600) % 60));
}

function leadZero(t: number) {
    return t < 10 ? `0${t}` : t;
}

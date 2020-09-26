import { useEffect, useRef } from 'react';
import { GameClient } from 'types/lib/backgammon';
// @ts-ignore
import diceThrow1 from '../../../../../../../../../../assets/dice_throw_1.wav';
// @ts-ignore
import diceThrow2 from '../../../../../../../../../../assets/dice_throw_2.wav';

export default function useDices(
    round?: GameClient['rounds'][number]
): number[] | undefined {
    const roundPlayer = round?.player;
    const counter = useRef(0);
    const audios = useRef([new Audio(diceThrow1), new Audio(diceThrow2)]);

    useEffect(() => {
        if (typeof roundPlayer !== 'undefined') {
            playAudio(pickAudio(checkEvenOdd(counter.current), audios.current));
            counter.current++;
        }
    }, [roundPlayer]);

    return round?.dice;
}

// helpers
function checkEvenOdd(n: number) {
    return n % 2 === 0;
}

function pickAudio(isEven: boolean, audios: HTMLAudioElement[]) {
    return isEven ? audios[0] : audios[1];
}

function playAudio(audio: ReturnType<typeof pickAudio>) {
    return audio.play();
}

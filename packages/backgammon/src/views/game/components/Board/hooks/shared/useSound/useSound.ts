import { useEffect, useRef } from 'react';

export default function useSound<D>(
    sounds: string[],
    dependency: D,
    condition: (dependency: D) => boolean,
    getSoundIndex: (i: number) => number
) {
    const counter = useRef(0);
    const audios = useRef(sounds.map(setAudio));

    useEffect(() => {
        if (condition(dependency)) {
            playAudio(
                pickAudio(audios.current, getSoundIndex(counter.current))
            );
            counter.current++;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency]);
}

function setAudio(sound: string) {
    return new Audio(sound);
}

function pickAudio(audios: HTMLAudioElement[], index: number) {
    return audios[index];
}

function playAudio(audio: ReturnType<typeof pickAudio>) {
    const promise = audio.play();
    typeof promise !== 'undefined' && promise.catch(console.error);
}

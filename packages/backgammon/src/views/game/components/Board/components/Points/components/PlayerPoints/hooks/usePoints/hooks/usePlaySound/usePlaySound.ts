import { Round } from 'types/lib/backgammon';
// @ts-ignore
import chipsCollide1 from '../../../../../../../../../../../../assets/chips_collide_1.wav';
// @ts-ignore
import chipsCollide2 from '../../../../../../../../../../../../assets/chips_collide_2.wav';
// @ts-ignore
import chipsCollide3 from '../../../../../../../../../../../../assets/chips_collide_3.wav';
import { useSound } from '../../../../../../../../hooks/shared';

const SOUNDS = [chipsCollide1, chipsCollide2, chipsCollide3];

export default function usePlaySound(layout?: Round['layout']) {
    useSound(SOUNDS, layout, condition, setSoundIndex);
}

function condition(param: Parameters<typeof usePlaySound>[0]) {
    return typeof param !== 'undefined';
}

function setSoundIndex(i: number) {
    return i % SOUNDS.length;
}

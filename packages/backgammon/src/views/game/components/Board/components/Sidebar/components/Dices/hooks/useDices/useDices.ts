import { GameClient } from 'types/lib/backgammon';
// @ts-ignore
import diceThrow1 from '../../../../../../../../../../assets/dice_throw_1.wav';
// @ts-ignore
import diceThrow2 from '../../../../../../../../../../assets/dice_throw_2.wav';
import { useSound } from '../../../../../../hooks/shared';

const SOUNDS = [diceThrow1, diceThrow2];

export default function useDices(
    round?: GameClient['rounds'][number]
): number[] | undefined {
    const roundPlayer = round?.player;
    useSound(SOUNDS, roundPlayer, condition, checkEvenOdd);

    return round?.dice;
}

// helpers
function condition<T>(param: T) {
    return typeof param !== 'undefined';
}
function checkEvenOdd(n: number) {
    return n % 2;
}

import { customPromise } from '@shared/customPromise';

export default function rollDice(max = 6) {
    // return customPromise(() => 1 + Math.floor(Math.random() * max));
    return customPromise(() => 5);
}

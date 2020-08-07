import { rollDice } from './utils';
import { Round } from '../../constants';

export default function rollDices(): Round['dice'] {
    const dice = [rollDice(), rollDice()];
    const shouldDuplicate = dice[0] === dice[1];

    return shouldDuplicate ? dice.concat(dice) : dice;
}

import { rollDice } from './utils';
import { BACKGAMMON_TYPES } from 'types';

export default function rollDices(): BACKGAMMON_TYPES.Round['dice'] {
    const dice = [rollDice(), rollDice()];
    const shouldDuplicate = dice[0] === dice[1];

    return shouldDuplicate ? dice.concat(dice) : dice;
}

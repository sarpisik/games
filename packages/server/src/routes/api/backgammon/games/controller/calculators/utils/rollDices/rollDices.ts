import { rollDice } from './utils';
import { BACKGAMMON_TYPES } from 'types';

export default async function rollDices(): Promise<
    BACKGAMMON_TYPES.Round['dice']
> {
    const dice = await Promise.all([rollDice(), rollDice()]);
    const shouldDuplicate = dice[0] === dice[1];

    return shouldDuplicate ? dice.concat(dice) : dice;
}

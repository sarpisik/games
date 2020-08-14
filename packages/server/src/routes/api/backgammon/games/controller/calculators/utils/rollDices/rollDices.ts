import { rollDice } from './utils';
import { Round } from '@shared-types/backgammon';

export default async function rollDices(): Promise<Round['dice']> {
    const dice = await Promise.all([rollDice(), rollDice()]);
    const shouldDuplicate = dice[0] === dice[1];

    return shouldDuplicate ? dice.concat(dice) : dice;
}

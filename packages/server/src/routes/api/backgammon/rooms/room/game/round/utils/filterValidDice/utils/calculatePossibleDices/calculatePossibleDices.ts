import { Round } from '@shared-types/backgammon';
import { duplicateDice, calculateSumDices } from './utils';

export default async function calculatePossibleDices(dices: Round['dice']) {
    let possibleDices: typeof dices = [];

    const [dice1, dice2] = dices;

    const isDouble = dice1 === dice2;

    if (isDouble) {
        possibleDices = await duplicateDice(dice1, dices.length);
    } else if (dice2) {
        const sumDices = await calculateSumDices(dices);
        possibleDices = [dice1, dice2, sumDices];
    } else {
        possibleDices = [dice1];
    }

    return possibleDices;
}

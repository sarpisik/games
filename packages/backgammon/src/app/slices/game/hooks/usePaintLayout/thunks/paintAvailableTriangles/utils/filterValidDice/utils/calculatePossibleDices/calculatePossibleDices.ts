import { calculateSumDices } from './utils';
import { duplicateDice } from './utils/duplicateDice';

export default function calculatePossibleDices(dices: number[]) {
    let possibleDices: typeof dices = [];

    const [dice1, dice2] = dices;

    const isDouble = dice1 === dice2;

    if (isDouble) {
        possibleDices = duplicateDice(dice1, dices.length);
    } else if (dice2) {
        possibleDices = [dice1, dice2, calculateSumDices(dices)];
    } else {
        possibleDices = [dice1];
    }

    return possibleDices;
}

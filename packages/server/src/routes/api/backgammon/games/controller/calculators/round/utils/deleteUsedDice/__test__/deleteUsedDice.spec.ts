import { InvalidDiceError } from '@shared/error';
import deleteUsedDice from '../deleteUsedDice';
import {
    generateDoubledDice,
    duplicateDice,
} from 'spec/support/generateDoubleDice';

describe('deleteUsedDice', () => {
    it(`should throw an "${InvalidDiceError.constructor.name}" error.`, (done) => {
        const dices = [1, 2];
        const possibleDices = [1, 2, 3];
        const usedDice = 4;
        const invalidDiceError = new InvalidDiceError(usedDice, possibleDices);

        deleteUsedDice(dices, possibleDices, usedDice).catch((diceErr) => {
            expect(diceErr.payload).toEqual(invalidDiceError.payload);
            done();
        });
    });

    it(`should delete the used dice of doubled dices`, (done) => {
        const dices = duplicateDice(2);
        const possibleDices = generateDoubledDice(dices[0]);
        const usedDice = possibleDices[2]; // 6

        deleteUsedDice(dices, possibleDices, usedDice).then((dices) => {
            expect(dices).toEqual([2]);
            done();
        });
    });

    it(`should delete the used dice of undoubled dices`, (done) => {
        const dices = [2, 5];
        const possibleDices = [...dices, 7];
        const usedDice = possibleDices[0]; // 2

        deleteUsedDice(dices, possibleDices, usedDice).then((dices) => {
            expect(dices).toEqual([5]);
            done();
        });
    });

    it(`should delete the all dices`, (done) => {
        const dices = [2, 5];
        const possibleDices = [...dices, 7];
        const usedDice = possibleDices[2]; // 7

        deleteUsedDice(dices, possibleDices, usedDice).then((dices) => {
            expect(dices).toEqual([]);
            done();
        });
    });
});

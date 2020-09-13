import { generateDoubledDice } from 'spec/support/generateDoubleDice';
import calculatePossibleDices from '../calculatePossibleDices';
import { generateValidDices } from 'spec/support/generateValidDices';

describe('calculatePossibleDices', () => {
    it('should calculate and return possible dices of doubled dice.', (done) => {
        const dice = 4;
        const dices = Array(dice).fill(dice);
        const possibleDices = generateDoubledDice(dice);

        calculatePossibleDices(dices).then((result) => {
            expect(result).toEqual(possibleDices);
            done();
        });
    });

    it('should calculate and return possible dices of undoubled dices.', (done) => {
        const dices = [2, 4];
        const possibleDices = generateValidDices(dices[0], dices[1]);

        calculatePossibleDices(dices).then((result) => {
            expect(result).toEqual(possibleDices);
            done();
        });
    });

    it('should return the passed dice when it is only.', (done) => {
        const dices = [2];

        calculatePossibleDices(dices).then((result) => {
            expect(result).toEqual(dices);
            done();
        });
    });
});

import { generateDoubledDice } from 'spec/support/generateDoubleDice';
import { duplicateDice } from '..';

describe('duplicateDice', () => {
    it('should duplicate dices', (done) => {
        const dice = 3;
        const dices = generateDoubledDice(dice);

        duplicateDice(dice, 4).then((result) => {
            expect(result).toEqual(dices);
            done();
        });
    });
});

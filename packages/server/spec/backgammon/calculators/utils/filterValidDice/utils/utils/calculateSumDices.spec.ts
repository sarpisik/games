import { calculateSumDices } from '@routes/api/backgammon/games/controller/calculators/utils/filterValidDice/utils/calculatePossibleDices/utils';

describe('backgammon/calculators/utils/calculateSumDices', () => {
    it(`should calculate correctly and return the sum of dices`, (done) => {
        const dices = [1, 2];
        calculateSumDices(dices).then((sum) => {
            expect(sum).toBe(dices.reduce((a, b) => a + b));
            done();
        });
    });
});

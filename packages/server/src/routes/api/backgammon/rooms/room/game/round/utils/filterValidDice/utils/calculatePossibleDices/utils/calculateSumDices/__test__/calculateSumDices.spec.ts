import calculateSumDices from '../calculateSumDices';

describe('calculateSumDices', () => {
    it('should calculate and return the sum of passed dices', (done) => {
        const dices = [3, 4];
        const sum = 7;

        calculateSumDices(dices).then((result) => {
            expect(result).toBe(sum);
            done();
        });
    });
});

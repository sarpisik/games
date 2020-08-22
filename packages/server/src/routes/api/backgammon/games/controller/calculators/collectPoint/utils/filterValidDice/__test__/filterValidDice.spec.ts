import filterValidDice from '../filterValidDice';

describe('filterValidDice', () => {
    it('should return triangle index related to dice', (done) => {
        const dices = [3, 5];
        const triangleIndex = 4;
        const validDiceIndex = 1;

        filterValidDice(triangleIndex, dices).then((result) => {
            expect(result).toBe(validDiceIndex);
            done();
        });
    });
});

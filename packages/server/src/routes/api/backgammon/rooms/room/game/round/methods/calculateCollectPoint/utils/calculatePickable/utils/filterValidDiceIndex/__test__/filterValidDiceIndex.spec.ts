import filterValidDiceIndex from '../filterValidDiceIndex';

describe('filterValidDiceIndex', () => {
    it('should return triangle index related to dice', (done) => {
        const dices = [3, 5];
        const triangleIndex = 4;
        const validDiceIndex = 1;

        filterValidDiceIndex(triangleIndex, dices).then((result) => {
            expect(result).toBe(validDiceIndex);
            done();
        });
    });
});

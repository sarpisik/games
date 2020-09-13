import filterMaxDice from '../filterMaxDice';

describe('filterMaxDice', () => {
    it('should return 1 as index of max. dice when dices are [3,5]', (done) => {
        const dices = [3, 5];
        const indexOfMaxDice = 1;

        filterMaxDice(dices).then((result) => {
            expect(result).toBe(indexOfMaxDice);
            done();
        });
    });
});

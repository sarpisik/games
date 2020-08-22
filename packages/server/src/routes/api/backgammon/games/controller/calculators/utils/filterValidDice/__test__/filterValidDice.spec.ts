import filterValidDice from '../filterValidDice';

describe('filterValidDice', () => {
    it('should filter dices by passed callback and return the result', (done) => {
        const dices = [5, 2];
        const cb = (dice: number) => dice > 2;
        const filteredDices = [5, 7];

        filterValidDice(dices, cb).then((result) => {
            expect(result).toEqual(filteredDices);
            done();
        });
    });
});

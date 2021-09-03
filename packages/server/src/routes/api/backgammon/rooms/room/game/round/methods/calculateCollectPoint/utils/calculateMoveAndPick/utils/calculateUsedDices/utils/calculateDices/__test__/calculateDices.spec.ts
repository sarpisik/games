import calculateDices from '../calculateDices';

describe('calculateDices', () => {
    it('should return if dices are double and filtered possible dices', (done) => {
        const dices = [5, 6];
        const dicesWithSum = dices.concat([dices.reduce((a, b) => a + b)]);

        calculateDices(dices).then((result) => {
            const [isDouble, possibleDices] = result;

            expect(isDouble).toBeFalse();
            expect(possibleDices).toEqual(dicesWithSum);
            done();
        });
    });
});

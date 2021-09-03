import calculateUsedDiceIndexes from '../calculateUsedDiceIndexes';

describe('calculateUsedDiceIndexes', () => {
    it('should return index of used dices', (done) => {
        const possibleDices = [2, 3, 5];
        const isDouble = false;
        const startIndex = 4;
        const usedDiceIndexes = [0, 1];

        calculateUsedDiceIndexes({ isDouble, possibleDices, startIndex }).then(
            (result) => {
                expect(result).toEqual(usedDiceIndexes);
                done();
            }
        );
    });

    it('should return index of used double dices', (done) => {
        const possibleDices = [3, 6, 9, 12]; // 3 - 3
        const isDouble = true;
        const startIndex = 4;
        const usedDiceIndexes = [0];

        calculateUsedDiceIndexes({ isDouble, possibleDices, startIndex }).then(
            (result) => {
                expect(result).toEqual(usedDiceIndexes);
                done();
            }
        );
    });
});

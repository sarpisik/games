import { filterValidDice } from '@routes/api/backgammon/games/controller/calculators/utils';

describe('backgammon/calculators/utils/filterValidDice', () => {
    it(`should filter correctly by passed callback and return the result array`, (done) => {
        const dices = [1, 1, 1];
        const result = [2, 3];

        filterValidDice(dices, (dice) => dice > 1).then((filteredDices) => {
            expect(filteredDices).toEqual(result);
            done();
        });
    });
});

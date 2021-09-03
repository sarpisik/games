import { rollDices } from '@routes/api/backgammon/games/controller/calculators/utils';

describe('backgammon/calculators/utils/rollDices', () => {
    it(`should calculate correctly and return dices`, (done) => {
        rollDices().then((dices) => {
            expect(dices.length).toBeLessThanOrEqual(4);
            expect(dices.length).toBeGreaterThanOrEqual(2);
            done();
        });
    });
});

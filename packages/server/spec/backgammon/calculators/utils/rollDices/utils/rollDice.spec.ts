import { rollDice } from '@routes/api/backgammon/games/controller/calculators/utils/rollDices/utils';

describe('backgammon/calculators/utils/rollDice', () => {
    const MAX = 6,
        MIN = 1;

    it(`should calculate correctly and return dice less than or equal to "${MAX}" and greater then or equal to "${MIN}"`, (done) => {
        rollDice(MAX).then((dice) => {
            expect(dice).toBeLessThanOrEqual(MAX);
            expect(dice).toBeGreaterThanOrEqual(MIN);
            done();
        });
    });

    it(`should calculate correctly and return dice less than or equal to "${MAX}" and greater then or equal to "${MIN}" even no arguments passed`, (done) => {
        rollDice().then((dice) => {
            expect(dice).toBeLessThanOrEqual(MAX);
            expect(dice).toBeGreaterThanOrEqual(MIN);
            done();
        });
    });
});

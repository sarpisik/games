import { calculatePossibleDices } from '@routes/api/backgammon/games/controller/calculators/utils/filterValidDice/utils';

describe('backgammon/calculators/utils/calculatePossibleDices', () => {
    it(`should calculate correctly and return the possible duplicate dices`, (done) => {
        const dices = [1, 1, 1];
        const result = dices.map((dice, i) => dice * (i + 1));

        calculatePossibleDices(dices).then((possibleDuplicatedDices) => {
            expect(possibleDuplicatedDices).toEqual(result);
            done();
        });
    });

    it(`should calculate correctly and return the possible dices with sum included.`, (done) => {
        const dices = [1, 2];
        const result = dices.concat([dices.reduce((a, b) => a + b)]);

        calculatePossibleDices(dices).then((possibleDices) => {
            expect(possibleDices).toEqual(result);
            done();
        });
    });

    it(`should calculate correctly and return the possible dice.`, (done) => {
        const dices = [1];
        const result = dices;

        calculatePossibleDices(dices).then((possibleDices) => {
            expect(possibleDices).toEqual(result);
            done();
        });
    });
});

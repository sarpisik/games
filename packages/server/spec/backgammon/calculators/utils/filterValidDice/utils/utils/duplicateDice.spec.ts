import { duplicateDice } from '@routes/api/backgammon/games/controller/calculators/utils/filterValidDice/utils/calculatePossibleDices/utils';

describe('backgammon/calculators/utils/duplicateDice', () => {
    it(`should calculate correctly and return the possible duplicate dices`, (done) => {
        const dices = [1, 1, 1];
        const result = dices.map((dice, i) => dice * (i + 1));

        duplicateDice(dices[0], dices.length).then((duplicatedDices) => {
            expect(duplicatedDices).toEqual(result);
            done();
        });
    });
});

import { PLAYERS } from '@shared-types/backgammon';
import filterValidDice from '../filterValidDice';

describe('filterValidDice', () => {
    it(`should return filtered dices for "${
        PLAYERS[PLAYERS.WHITE]
    }" player`, (done) => {
        const triangleIndex = 20;
        const dices = [2, 5];
        const limit = 23;
        const player = PLAYERS.WHITE;
        const filteredDices = [2];

        filterValidDice(triangleIndex, player, dices, limit).then((result) => {
            expect(result).toEqual(filteredDices);
            done();
        });
    });

    it(`should return filtered dices for "${
        PLAYERS[PLAYERS.BLACK]
    }" player`, (done) => {
        const triangleIndex = 3;
        const dices = [2, 5];
        const limit = 0;
        const player = PLAYERS.BLACK;
        const filteredDices = [2];

        filterValidDice(triangleIndex, player, dices, limit).then((result) => {
            expect(result).toEqual(filteredDices);
            done();
        });
    });
});

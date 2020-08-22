import { OPPONENT, PLAYERS } from '@shared-types/backgammon';
import generateArea from '../generateArea';
import { layout } from '@routes/api/backgammon/games/constants';

describe('generateArea', () => {
    it(`should return collectable are of ${
        PLAYERS[PLAYERS.BLACK]
    } player`, (done) => {
        const blackArea = layout.slice(0, 6);

        generateArea(PLAYERS.WHITE, layout).then((result) => {
            expect(result).toEqual(blackArea);
            done();
        });
    });

    it(`should return collectable are of ${
        PLAYERS[PLAYERS.WHITE]
    } player`, (done) => {
        const whiteArea = layout.slice(-6).reverse();

        generateArea(PLAYERS.BLACK, layout).then((result) => {
            expect(result).toEqual(whiteArea);
            done();
        });
    });
});

import { PLAYERS } from '@shared-types/backgammon';
import { layout } from '@routes/api/backgammon/games/constants';
import getAreaExcludedCollectArea from '../getAreaExcludedCollectArea';

describe('getAreaExcludedCollectArea', () => {
    it(`should return the out of collectable are of "${
        PLAYERS[PLAYERS.WHITE]
    }" player.`, (done) => {
        const collectableArea = layout.slice(0, 18);

        getAreaExcludedCollectArea(PLAYERS.WHITE, layout).then((result) => {
            expect(result).toEqual(collectableArea);
            done();
        });
    });

    it(`should return the out of collectable are of "${
        PLAYERS[PLAYERS.BLACK]
    }" player.`, (done) => {
        const collectableArea = layout.slice(6, layout.length);

        getAreaExcludedCollectArea(PLAYERS.BLACK, layout).then((result) => {
            expect(result).toEqual(collectableArea);
            done();
        });
    });
});

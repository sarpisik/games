import { layout } from '@routes/api/backgammon/games/constants';
import { getAreaExcludedCollectArea } from '@routes/api/backgammon/games/controller/calculators/utils';
import { PLAYERS } from '@shared-types/backgammon';

describe('backgammon/calculators/utils/getAreaExcludedCollectArea', () => {
    it(`should calculate correctly and return the area for "${
        PLAYERS[PLAYERS.WHITE]
    }"`, (done) => {
        getAreaExcludedCollectArea(PLAYERS.WHITE, layout).then((area) => {
            expect(area.length).toEqual(18);
            expect(area).toEqual(layout.slice(0, 18));
            done();
        });
    });

    it(`should calculate correctly and return the area for "${
        PLAYERS[PLAYERS.BLACK]
    }"`, (done) => {
        getAreaExcludedCollectArea(PLAYERS.BLACK, layout).then((area) => {
            expect(area.length).toEqual(18);
            expect(area).toEqual(layout.slice(6, layout.length));
            done();
        });
    });
});

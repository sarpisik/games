import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { PLAYERS } from '@shared-types/backgammon';
import calculateCollectArea from '../calculateCollectArea';

describe('calculateCollectArea', () => {
    it(`should return collect area of player: "${
        PLAYERS[PLAYERS.WHITE]
    }"`, (done) => {
        const result = layout.slice(18, 24).reverse();

        calculateCollectArea(PLAYERS.WHITE, layout).then((area) => {
            expect(area).toEqual(result);
            done();
        });
    });

    it(`should return collect area of player: "${
        PLAYERS[PLAYERS.BLACK]
    }"`, (done) => {
        const result = layout.slice(0, 6);

        calculateCollectArea(PLAYERS.BLACK, layout).then((area) => {
            expect(area).toEqual(result);
            done();
        });
    });
});

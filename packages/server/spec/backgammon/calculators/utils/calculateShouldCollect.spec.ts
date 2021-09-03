import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { calculateShouldCollect } from '@routes/api/backgammon/rooms/room/game/round/utils';
import { PLAYERS } from '@shared-types/backgammon';

describe('backgammon/calculators/utils/calculateShouldCollect', () => {
    it(`should calculate correctly and return false for "${
        PLAYERS[PLAYERS.WHITE]
    }"`, (done) => {
        calculateShouldCollect(PLAYERS.WHITE, layout).then((shoulCollect) => {
            expect(shoulCollect).toBeFalse();
            done();
        });
    });

    it(`should calculate correctly and return true for "${
        PLAYERS[PLAYERS.WHITE]
    }"`, (done) => {
        calculateShouldCollect(
            PLAYERS.WHITE,
            layout.map(() => [PLAYERS.NONE, 0])
        ).then((shoulCollect) => {
            expect(shoulCollect).toBeTrue();
            done();
        });
    });
});

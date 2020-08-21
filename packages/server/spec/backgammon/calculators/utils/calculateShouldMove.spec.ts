import { layout } from '@routes/api/backgammon/games/constants';
import { calculateShouldMove } from '@routes/api/backgammon/games/controller/calculators/utils';
import { PLAYERS } from '@shared-types/backgammon';

describe('backgammon/calculators/utils/calculateShouldMove', () => {
    const outAreaOfCollectArea = layout.slice(0, 18);

    it(`should calculate correctly and return true for "${
        PLAYERS[PLAYERS.WHITE]
    }"`, (done) => {
        calculateShouldMove(PLAYERS.WHITE, outAreaOfCollectArea).then(
            (shouldMove) => {
                expect(shouldMove).toBeTrue();
                done();
            }
        );
    });

    it(`should calculate correctly and return false for "${
        PLAYERS[PLAYERS.WHITE]
    }"`, (done) => {
        const layout = outAreaOfCollectArea.map(() => [PLAYERS.NONE, 0]);

        calculateShouldMove(PLAYERS.WHITE, layout).then((shouldMove) => {
            expect(shouldMove).toBeFalse();
            done();
        });
    });
});

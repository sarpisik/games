import { PLAYERS } from '@shared-types/backgammon';
import { layout } from '@routes/api/backgammon/games/constants';
import filterFarthestTriangle from '../filterFarthestTriangle';

type Params = Parameters<typeof filterFarthestTriangle>[0];

describe('filterFarthestTriangle', () => {
    const createArea = () =>
        layout.map((_, i) => {
            if (i <= 5 && i >= 0) return [PLAYERS.BLACK, 3];
            if (i <= 23 && i >= 18) return [PLAYERS.WHITE, 3];
            return [PLAYERS.NONE, 0];
        });

    it(`should return the farthest triangle index for player: "${
        PLAYERS[PLAYERS.WHITE]
    }"`, (done) => {
        const result = 18;

        filterFarthestTriangle(createArea(), PLAYERS.WHITE).then(
            (farthestTriangle) => {
                expect(farthestTriangle).toBe(result);
                done();
            }
        );
    });

    it(`should return the 5th triangle index for player: "${
        PLAYERS[PLAYERS.WHITE]
    }"`, (done) => {
        const layout = createArea().map((t, i) => {
            if (i === 18) return [PLAYERS.NONE, 0];
            return t;
        });
        const result = 19;

        filterFarthestTriangle(layout, PLAYERS.WHITE).then(
            (farthestTriangle) => {
                expect(farthestTriangle).toBe(result);
                done();
            }
        );
    });

    it(`should return the farthest triangle index for player: "${
        PLAYERS[PLAYERS.BLACK]
    }"`, (done) => {
        const result = 5;

        filterFarthestTriangle(createArea(), PLAYERS.BLACK).then(
            (farthestTriangle) => {
                expect(farthestTriangle).toBe(result);
                done();
            }
        );
    });
});

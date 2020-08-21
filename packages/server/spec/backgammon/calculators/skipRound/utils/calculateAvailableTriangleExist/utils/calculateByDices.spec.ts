import { layout } from '@routes/api/backgammon/games/constants';
import { calculateByDices } from '@routes/api/backgammon/games/controller/calculators/skipRound/utils/calculateAvailableTriangleExist/utils/recursivelyCalculateAvailableTriangle/utils';
import { PLAYERS } from '@shared-types/backgammon';

describe('backgammon/calculators/skipRound/utils/calculateAvailableTriangleExist/utils/recursivelyCalculateAvailableTriangle/utils/calculateByDices', () => {
    describe('calculations for available triangle', () => {
        let _params: Parameters<typeof calculateByDices>[0];

        beforeEach(() => {
            _params = {
                dices: [3, 4],
                fromTriangleIndex: 0,
                roundPlayer: PLAYERS.WHITE,
                shouldCollect: false,
                triangles: layout,
            };
        });

        it(`should return true when there is movable empty triangle exist for "${
            PLAYERS[PLAYERS.WHITE]
        }".`, (done) => {
            calculateByDices(_params).then((movable) => {
                expect(movable).toBeTrue();
                done();
            });
        });

        it(`should return true when there is movable but taken triangle exist for "${
            PLAYERS[PLAYERS.WHITE]
        }".`, (done) => {
            const targetTriangle = _params.dices[0];
            _params.triangles = layout.map((t, i) => {
                if (i === targetTriangle) return [PLAYERS.BLACK, 1];
                if (i === 5) return [t[0], t[1] - 1];
                return t;
            });

            calculateByDices(_params).then((movable) => {
                expect(movable).toBeTrue();
                done();
            });
        });
    });

    describe('calculations for unavailable triangle', () => {
        let _params: Parameters<typeof calculateByDices>[0];

        beforeEach(() => {
            _params = {
                dices: [5, 5],
                fromTriangleIndex: 0,
                roundPlayer: PLAYERS.WHITE,
                shouldCollect: false,
                triangles: layout,
            };
        });

        it(`should return false when there is no movable empty triangle exist for "${
            PLAYERS[PLAYERS.WHITE]
        }".`, (done) => {
            calculateByDices(_params).then((movable) => {
                expect(movable).toBeFalse();
                done();
            });
        });

        it(`should return false when there is no triangle left for "${
            PLAYERS[PLAYERS.WHITE]
        }".`, (done) => {
            _params.fromTriangleIndex = layout.length - 4;

            calculateByDices(_params).then((movable) => {
                expect(movable).toBeFalse();
                done();
            });
        });
    });
});

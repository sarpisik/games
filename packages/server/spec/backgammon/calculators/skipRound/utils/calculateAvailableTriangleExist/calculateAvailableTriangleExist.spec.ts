import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { calculateAvailableTriangleExist } from '@routes/api/backgammon/rooms/room/game/helpers/skipRound/utils';
import { PLAYERS } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';

describe('backgammon/calculators/skipRound/utils/calculateAvailableTriangleExist', () => {
    describe('calculations for available triangle', () => {
        let _params: Parameters<typeof calculateAvailableTriangleExist>[0];

        beforeEach(() => {
            _params = {
                id: Date.now(),
                attempt: 1,
                turn: 1,
                player: PLAYERS.WHITE,
                brokens: generateBrokens(0, 0),
                collected: generateBrokens(0, 0),
                dice: [2, 5],
                layout,
            };
        });

        it(`should return true when there is movable triangle exist for "${
            PLAYERS[PLAYERS.WHITE]
        }".`, (done) => {
            calculateAvailableTriangleExist(_params).then((movable) => {
                expect(movable).toBeTrue();
                done();
            });
        });

        it(`should return true when there is movable triangle exist for "${
            PLAYERS[PLAYERS.WHITE]
        }" even the first triangle is blocked.`, (done) => {
            _params.layout = layout.map((t, i) => {
                if (i < 1) return [PLAYERS.BLACK, 2];
                if (i === 5) return [t[0], t[1] - 2];
                return t;
            });

            calculateAvailableTriangleExist(_params).then((movable) => {
                expect(movable).toBeTrue();
                done();
            });
        });

        it(`should return false when there is no movable triangle exist for "${
            PLAYERS[PLAYERS.WHITE]
        }".`, (done) => {
            _params.dice = [5, 5];
            _params.layout = layout.map((t, i) => {
                // if (i < 1) return [t[0], t[1] + 3];
                if (i === 16) return [PLAYERS.BLACK, 2];
                return t;
            });

            calculateAvailableTriangleExist(_params).then((movable) => {
                expect(movable).toBeFalse();
                done();
            });
        });

        it(`should return true when there is movable triangle exist for "${
            PLAYERS[PLAYERS.BLACK]
        }".`, (done) => {
            _params.player = PLAYERS.BLACK;

            calculateAvailableTriangleExist(_params).then((movable) => {
                expect(movable).toBeTrue();
                done();
            });
        });
    });
});

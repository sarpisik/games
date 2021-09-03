import { layout as triangles } from '@routes/api/backgammon/rooms/room/game/constants';
import { PLAYERS } from '@shared-types/backgammon';
import calculateByDices from '../calculateByDices';

describe('calculateByDices', () => {
    let _params: Parameters<typeof calculateByDices>[0];

    beforeEach(() => {
        _params = {
            dices: [2, 5],
            fromTriangleIndex: 0,
            roundPlayer: PLAYERS.WHITE,
            triangles,
        };
    });

    it(`should return true for "${
        PLAYERS[PLAYERS.WHITE]
    }" player when one of the target triangles is not blocked.`, (done) => {
        calculateByDices(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });

    it(`should return true for "${
        PLAYERS[PLAYERS.WHITE]
    }" player when target triangle has opponent's point but not blocked.`, (done) => {
        _params.dices = [5];
        _params.triangles = triangles.map((t, i) => {
            if (i === 5) return [t[0], 1];
            return t;
        });

        calculateByDices(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });

    it(`should return false for "${
        PLAYERS[PLAYERS.WHITE]
    }" player when target triangle is blocked.`, (done) => {
        // Minimize layout
        _params.triangles = triangles.slice(0, 6);
        _params.dices = [5];

        calculateByDices(_params).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });

    it(`should return false for "${
        PLAYERS[PLAYERS.WHITE]
    }" player when target triangle(s) are not exist.`, (done) => {
        // Minimize layout
        _params.triangles = triangles.slice(0, 6);
        _params.fromTriangleIndex = 3;
        _params.dices = [5];

        calculateByDices(_params).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });
});

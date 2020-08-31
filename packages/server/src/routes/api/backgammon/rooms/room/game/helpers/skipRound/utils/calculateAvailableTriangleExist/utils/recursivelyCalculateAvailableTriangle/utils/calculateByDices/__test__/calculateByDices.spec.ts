import calculateByDices from '../calculateByDices';
import { PLAYERS } from '@shared-types/backgammon';
import { layout as triangles } from '@routes/api/backgammon/games/constants';

describe('calculateByDices', () => {
    let _params: Parameters<typeof calculateByDices>[0];

    beforeEach(() => {
        _params = {
            dices: [2, 5],
            fromTriangleIndex: 0,
            roundPlayer: PLAYERS.WHITE,
            triangles,
            shouldCollect: false,
        };
    });

    it(`should return true when "${
        PLAYERS[PLAYERS.WHITE]
    }" player is not collecting and has available triangle to move.`, (done) => {
        calculateByDices(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });

    it(`should return true when "${
        PLAYERS[PLAYERS.WHITE]
    }" player is not collecting and target triangle is not blocked.`, (done) => {
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

    it(`should return true when "${
        PLAYERS[PLAYERS.WHITE]
    }" player is collecting and has available triangle to move.`, (done) => {
        _params.shouldCollect = true;

        calculateByDices(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });

    it(`should return false when "${
        PLAYERS[PLAYERS.WHITE]
    }" player is not collecting and target triangles are blocked.`, (done) => {
        // Minimize layout
        _params.triangles = triangles.slice(0, 6);
        _params.dices = [5];

        calculateByDices(_params).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });

    it(`should return false when "${
        PLAYERS[PLAYERS.WHITE]
    }" player is collecting and target triangles are blocked.`, (done) => {
        // Minimize layout
        _params.triangles = triangles.slice(0, 6);
        _params.dices = [5];
        _params.shouldCollect = true;

        calculateByDices(_params).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });

    it(`should return false when "${
        PLAYERS[PLAYERS.WHITE]
    }" player is not collecting and target triangle(s) not exist.`, (done) => {
        // Minimize layout
        _params.triangles = triangles.slice(0, 6);
        _params.fromTriangleIndex = 3;
        _params.dices = [5];

        calculateByDices(_params).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });

    it(`should return true when "${
        PLAYERS[PLAYERS.WHITE]
    }" player is collecting and target triangle(s) not exist.`, (done) => {
        // Minimize layout
        _params.triangles = triangles.slice(0, 6);
        _params.fromTriangleIndex = 3;
        _params.dices = [5];
        _params.shouldCollect = true;

        calculateByDices(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });
});

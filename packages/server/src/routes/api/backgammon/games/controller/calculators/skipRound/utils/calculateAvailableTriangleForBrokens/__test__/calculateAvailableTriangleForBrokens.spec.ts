import { PLAYERS } from '@shared-types/backgammon';
import calculateAvailableTriangleForBrokens from '../calculateAvailableTriangleForBrokens';
import { generateRound } from 'spec/support/generateRound';

describe('calculateAvailableTriangleForBrokens', () => {
    let _params: Parameters<typeof calculateAvailableTriangleForBrokens>[0];

    beforeEach(() => {
        _params = generateRound(PLAYERS.WHITE, [5, 2]);
    });

    // WHITE PLEAYER

    it(`should return true when there is atleast one available triangle exist for "${
        PLAYERS[PLAYERS.WHITE]
    }" player.`, (done) => {
        calculateAvailableTriangleForBrokens(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });

    it(`should return true when there is atleast one available triangle exist event captured by opponent for "${
        PLAYERS[PLAYERS.WHITE]
    }" player.`, (done) => {
        _params.layout = _params.layout.map((t, i) => {
            if (_params.dice.includes(i + 1)) return [PLAYERS.BLACK, 1];
            return t;
        });

        calculateAvailableTriangleForBrokens(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });

    // BLACK PLAYER

    it(`should return true when there is atleast one available triangle exist for "${
        PLAYERS[PLAYERS.BLACK]
    }" player.`, (done) => {
        _params.player = PLAYERS.BLACK;

        calculateAvailableTriangleForBrokens(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });

    it(`should return true when there is atleast one available triangle exist event captured by opponent for "${
        PLAYERS[PLAYERS.BLACK]
    }" player.`, (done) => {
        _params.player = PLAYERS.BLACK;
        _params.layout = _params.layout.map((t, i) => {
            if (_params.dice.includes(i + 1)) return [PLAYERS.WHITE, 1];
            return t;
        });

        calculateAvailableTriangleForBrokens(_params).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });
});

import { PLAYERS } from '@shared-types/backgammon';
import calculateSkipRound from '../calculateSkipRound';
import { generateRound } from 'spec/support/generateRound';
import generateBrokens from 'spec/support/generateBrokens';

type Params = Parameters<typeof calculateSkipRound>[0];

describe('calculateSkipRound', () => {
    let _params: Params;

    beforeEach(() => {
        _params = generateRound(PLAYERS.WHITE, [3, 4]);
    });

    it(`should not skip round for "${
        PLAYERS[PLAYERS.WHITE]
    }" player when it has no brokens.`, (done) => {
        calculateSkipRound(_params).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });

    it(`should not skip round for "${
        PLAYERS[PLAYERS.WHITE]
    }" player when it has brokens.`, (done) => {
        _params.brokens = generateBrokens(1, 0);

        calculateSkipRound(_params).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });
});

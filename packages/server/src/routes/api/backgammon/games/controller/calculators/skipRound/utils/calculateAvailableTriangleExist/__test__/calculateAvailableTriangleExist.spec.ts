import { PLAYERS } from '@shared-types/backgammon';
import calculateAvailableTriangleExist from '../calculateAvailableTriangleExist';
import { layout } from '@routes/api/backgammon/games/constants';
import generateBrokens from 'spec/support/generateBrokens';

type Params = Parameters<typeof calculateAvailableTriangleExist>[0];

describe('calculateAvailableTriangleExist', () => {
    const generateParams = (
        player: Params['player'],
        dice = [2, 5]
    ): Params => ({
        id: Date.now(),
        player,
        layout,
        attempt: 1,
        turn: 1,
        brokens: generateBrokens(0, 0),
        collected: generateBrokens(0, 0),
        dice,
    });

    describe(`"${PLAYERS[PLAYERS.WHITE]}" player:`, () => {
        let _params: Params;

        beforeEach(() => {
            _params = generateParams(PLAYERS.WHITE);
        });

        it('should return true', (done) => {
            calculateAvailableTriangleExist(_params).then((result) => {
                expect(result).toBeTrue();
                done();
            });
        });
    });

    describe(`"${PLAYERS[PLAYERS.BLACK]}" player:`, () => {
        let _params: Params;

        beforeEach(() => {
            _params = generateParams(PLAYERS.BLACK);
        });

        it('should return true', (done) => {
            calculateAvailableTriangleExist(_params).then((result) => {
                expect(result).toBeTrue();
                done();
            });
        });
    });
});

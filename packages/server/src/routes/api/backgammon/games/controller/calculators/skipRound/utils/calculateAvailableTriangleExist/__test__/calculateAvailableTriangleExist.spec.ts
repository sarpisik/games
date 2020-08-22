import { PLAYERS } from '@shared-types/backgammon';
import { generateRound } from 'spec/support/generateRound';
import calculateAvailableTriangleExist from '../calculateAvailableTriangleExist';

type Params = Parameters<typeof calculateAvailableTriangleExist>[0];

describe('calculateAvailableTriangleExist', () => {
    describe(`"${PLAYERS[PLAYERS.WHITE]}" player:`, () => {
        let _params: Params;

        beforeEach(() => {
            _params = generateRound(PLAYERS.WHITE);
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
            _params = generateRound(PLAYERS.BLACK);
        });

        it('should return true', (done) => {
            calculateAvailableTriangleExist(_params).then((result) => {
                expect(result).toBeTrue();
                done();
            });
        });
    });
});

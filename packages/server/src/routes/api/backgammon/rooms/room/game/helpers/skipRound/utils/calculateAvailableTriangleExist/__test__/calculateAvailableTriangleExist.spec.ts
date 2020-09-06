import { PLAYERS } from '@shared-types/backgammon';
import { generateRound } from 'spec/support/generateRound';
import calculateAvailableTriangleExist from '../calculateAvailableTriangleExist';
import { layout } from '../../../../../constants';

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

        it('should return true in collectable mode', (done) => {
            _params.layout = layout.map((t, i) => {
                switch (i) {
                    // Black points
                    case 4: // 5th triangle
                        return [PLAYERS.BLACK, 4];

                    // Delete the rest black points
                    case 0: // White points
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                    case 8:
                    case 13:
                    case 23:
                        return [PLAYERS.NONE, 0];

                    default:
                        return t;
                }
            });
            _params.dice = [5];
            calculateAvailableTriangleExist(_params).then((result) => {
                expect(result).toBeTrue();
                done();
            });
        });
    });
});

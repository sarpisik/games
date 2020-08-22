import { layout } from '@routes/api/backgammon/games/constants';
import { PLAYERS } from '@shared-types/backgammon';
import calculateShouldMove from '../calculateShouldMove';

describe('calculateShouldMove', () => {
    it('should return true', (done) => {
        calculateShouldMove(PLAYERS.WHITE, layout).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });
});

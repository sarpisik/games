import calculateShouldCollect from '../calculateShouldCollect';
import { PLAYERS } from '@shared-types/backgammon';
import { layout } from '@routes/api/backgammon/games/constants';

describe('calculateShouldCollect', () => {
    it('should return false', (done) => {
        calculateShouldCollect(PLAYERS.WHITE, layout).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });
});

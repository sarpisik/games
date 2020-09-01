import { PLAYERS } from '@shared-types/backgammon';
import { layout } from '../../../../constants';
import calculateShouldCollect from '../calculateShouldCollect';

describe('calculateShouldCollect', () => {
    it('should return false', (done) => {
        calculateShouldCollect(PLAYERS.WHITE, layout).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });
});

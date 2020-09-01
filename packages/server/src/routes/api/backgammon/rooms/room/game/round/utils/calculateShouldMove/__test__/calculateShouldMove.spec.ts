import { PLAYERS } from '@shared-types/backgammon';
import { layout } from '../../../../constants';
import calculateShouldMove from '../calculateShouldMove';

describe('calculateShouldMove', () => {
    it('should return true', (done) => {
        calculateShouldMove(PLAYERS.WHITE, layout).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });
});

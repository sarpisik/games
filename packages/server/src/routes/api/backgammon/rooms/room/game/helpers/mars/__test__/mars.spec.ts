import { PLAYERS } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';
import calculateMars from '../mars';

describe('mars', () => {
    it('should return true', (done) => {
        calculateMars(PLAYERS.WHITE, generateBrokens(16, 0)).then((result) => {
            expect(result).toBeTrue();
            done();
        });
    });

    it('should return false', (done) => {
        calculateMars(PLAYERS.WHITE, generateBrokens(16, 1)).then((result) => {
            expect(result).toBeFalse();
            done();
        });
    });
});

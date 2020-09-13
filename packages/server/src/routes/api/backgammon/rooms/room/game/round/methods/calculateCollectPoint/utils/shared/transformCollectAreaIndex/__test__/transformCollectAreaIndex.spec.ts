import transformCollectAreaIndex from '../transformCollectAreaIndex';
import { PLAYERS } from '@shared-types/backgammon';

describe('transformCollectAreaIndex', () => {
    it(`should return transformed index for "${
        PLAYERS[PLAYERS.WHITE]
    }" player`, (done) => {
        transformCollectAreaIndex(PLAYERS.WHITE, 20).then((result) => {
            expect(result).toBe(3);
            done();
        });
    });

    it(`should return transformed index for "${
        PLAYERS[PLAYERS.BLACK]
    }" player`, (done) => {
        transformCollectAreaIndex(PLAYERS.BLACK, 3).then((result) => {
            expect(result).toBe(3);
            done();
        });
    });
});

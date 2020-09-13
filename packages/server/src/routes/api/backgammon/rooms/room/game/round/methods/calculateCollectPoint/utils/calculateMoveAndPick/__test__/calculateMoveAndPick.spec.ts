import { PLAYERS } from '@shared-types/backgammon';
import { calculateMoveAndPick, Params } from '../calculateMoveAndPick';

describe('calculateMoveAndPick', () => {
    let params: Params;

    beforeEach(() => {
        params = {
            player: PLAYERS.WHITE,
            layout: Array(24)
                .fill(0)
                .map((_, i) => {
                    const whiteArea = i >= 18 && i <= 22;
                    if (whiteArea) return [PLAYERS.WHITE, 3];
                    if (i === 23) return [PLAYERS.BLACK, 2];
                    return [PLAYERS.NONE, 0];
                }),
            dices: [4, 1],
            triangleIndex: 4, // 4th triangle from white area
        };
    });

    it('returns count of deleted dices', (done) => {
        calculateMoveAndPick(params).then((deletedDiscount) => {
            expect(deletedDiscount).toBe(2);
            done();
        });
    });
});

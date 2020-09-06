import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { PLAYERS } from '@shared-types/backgammon';
import recursivelyCalculateAvailableTriangle, {
    Params,
} from '../recursivelyCalculateAvailableTriangle';

describe('recursivelyCalculateAvailableTriangle', () => {
    describe('resolves true', () => {
        it('on initial layout', (done) => {
            const params: Params = {
                triangles: layout,
                roundPlayer: PLAYERS.WHITE,
                dices: [6, 6],
                resolve(value) {
                    expect(value).toBeTrue();
                    done();
                },
            };
            recursivelyCalculateAvailableTriangle(params);
        });
    });

    describe('resolves false', () => {
        it('when all triangles are blocked.', (done) => {
            const params: Params = {
                triangles: Array(layout.length)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 3: // 4th triangle
                                return [PLAYERS.BLACK, 2];

                            // White player triangles
                            case 0: // 1th triangle
                                return [PLAYERS.WHITE, 2];

                            default:
                                return t;
                        }
                    }),
                roundPlayer: PLAYERS.WHITE,
                dices: [3],
                resolve(value) {
                    expect(value).toBeFalse();
                    done();
                },
            };
            recursivelyCalculateAvailableTriangle(params);
        });
    });
});

import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { PLAYERS } from '@shared-types/backgammon';
import recursivelyCalculateAvailableTriangle, {
    Params,
} from '../recursivelyCalculateAvailableTriangle';

describe('recursivelyCalculateAvailableTriangle', () => {
    it('resolves true on initial layout', (done) => {
        const params: Params = {
            triangles: layout,
            roundPlayer: PLAYERS.WHITE,
            shouldCollect: false,
            dices: [6, 6],
            resolve(value) {
                expect(value).toBeTrue();
                done();
            },
        };
        recursivelyCalculateAvailableTriangle(params);
    });

    it('resolves false when all possible triangles are blocked', (done) => {
        const params: Params = {
            triangles: layout.map((t, i) => {
                switch (i) {
                    case 5:
                        return [PLAYERS.BLACK, 3];
                    case 6:
                        return [PLAYERS.BLACK, 3];
                    case 7:
                        return [PLAYERS.NONE, 0];
                    case 17:
                        return [PLAYERS.BLACK, 2];
                    case 22:
                        return [PLAYERS.BLACK, 2];
                    case 23:
                        return [PLAYERS.NONE, 0];

                    default:
                        return t;
                }
            }),
            roundPlayer: PLAYERS.WHITE,
            shouldCollect: false,
            dices: [6, 6],
            resolve(value) {
                expect(value).toBeFalse();
                done();
            },
        };
        recursivelyCalculateAvailableTriangle(params);
    });

    it('resolves true when collectable mode and pickable but not movable by higher dice.', (done) => {
        const params: Params = {
            triangles: Array(layout.length)
                .fill([PLAYERS.NONE, 0])
                .map((t, i) => {
                    switch (i) {
                        // Black player triangles
                        case 3:
                            return [PLAYERS.BLACK, 2];

                        default:
                            return t;
                    }
                })
                .reverse(),
            roundPlayer: PLAYERS.BLACK,
            shouldCollect: true,
            dices: [6, 6, 6, 6],
            resolve(value) {
                expect(value).toBeTrue();
                done();
            },
        };
        recursivelyCalculateAvailableTriangle(params);
    });

    it('resolves false when collectable mode but not movable with single dice.', (done) => {
        const params: Params = {
            triangles: Array(layout.length)
                .fill([PLAYERS.NONE, 0])
                .map((t, i) => {
                    switch (i) {
                        // Black player triangles
                        case 0:
                            return [PLAYERS.BLACK, 5];
                        case 4:
                            return [PLAYERS.BLACK, 2];
                        // White player triangles
                        case 1:
                            return [PLAYERS.WHITE, 2];
                        case 3:
                            return [PLAYERS.WHITE, 1];
                        case 23:
                            return [PLAYERS.WHITE, 5];

                        default:
                            return t;
                    }
                })
                .reverse(),
            roundPlayer: PLAYERS.BLACK,
            shouldCollect: true,
            dices: [3],
            resolve(value) {
                expect(value).toBeFalse();
                done();
            },
        };
        recursivelyCalculateAvailableTriangle(params);
    });

    it('resolves false when collectable mode but not movable with all dices.', (done) => {
        const params: Params = {
            triangles: Array(layout.length)
                .fill([PLAYERS.NONE, 0])
                .map((t, i) => {
                    switch (i) {
                        // Black player triangles
                        case 4:
                            return [PLAYERS.BLACK, 2];
                        // White player triangles
                        case 0:
                            return [PLAYERS.WHITE, 5];
                        case 1:
                            return [PLAYERS.WHITE, 2];
                        case 3:
                            return [PLAYERS.WHITE, 1];
                        case 23:
                            return [PLAYERS.WHITE, 5];

                        default:
                            return t;
                    }
                })
                .reverse(),
            roundPlayer: PLAYERS.BLACK,
            shouldCollect: true,
            dices: [3, 4],
            resolve(value) {
                expect(value).toBeFalse();
                done();
            },
        };
        recursivelyCalculateAvailableTriangle(params);
    });

    it('resolves true when collectable mode and movable with one of the dices.', (done) => {
        const params: Params = {
            triangles: Array(layout.length)
                .fill([PLAYERS.NONE, 0])
                .map((t, i) => {
                    switch (i) {
                        // Black player triangles
                        case 0:
                            return [PLAYERS.BLACK, 5];
                        case 4:
                            return [PLAYERS.BLACK, 2];
                        // White player triangles
                        case 1:
                            return [PLAYERS.WHITE, 2];
                        case 3:
                            return [PLAYERS.WHITE, 1];
                        case 23:
                            return [PLAYERS.WHITE, 5];

                        default:
                            return t;
                    }
                })
                .reverse(),
            roundPlayer: PLAYERS.BLACK,
            shouldCollect: true,
            dices: [3, 4],
            resolve(value) {
                expect(value).toBeTrue();
                done();
            },
        };
        recursivelyCalculateAvailableTriangle(params);
    });

    it('resolves true when collectable mode and pickable single dice.', (done) => {
        const params: Params = {
            triangles: Array(layout.length)
                .fill([PLAYERS.NONE, 0])
                .map((t, i) => {
                    switch (i) {
                        // Black player triangles
                        case 4:
                            return [PLAYERS.BLACK, 2];
                        // White player triangles
                        case 0:
                            return [PLAYERS.WHITE, 5];
                        case 1:
                            return [PLAYERS.WHITE, 2];
                        case 3:
                            return [PLAYERS.WHITE, 1];
                        case 23:
                            return [PLAYERS.WHITE, 5];

                        default:
                            return t;
                    }
                })
                .reverse(),
            roundPlayer: PLAYERS.BLACK,
            shouldCollect: true,
            dices: [5],
            resolve(value) {
                expect(value).toBeTrue();
                done();
            },
        };
        recursivelyCalculateAvailableTriangle(params);
    });
});

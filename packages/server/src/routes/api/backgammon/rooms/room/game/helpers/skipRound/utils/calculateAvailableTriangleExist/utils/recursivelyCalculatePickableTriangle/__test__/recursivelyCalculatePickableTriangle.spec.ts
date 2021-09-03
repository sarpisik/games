import { PLAYERS } from '@shared-types/backgammon';
import recursivelyCalculatePickableTriangle, {
    Params,
} from '../recursivelyCalculatePickableTriangle';

describe('recursivelyCalculatePickableTriangle', () => {
    describe('resolves true', () => {
        it(`when pickable point exist by one dice for "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 4: // 5th triangle
                                return [PLAYERS.BLACK, 2];

                            default:
                                return t;
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.BLACK,
                dices: [5],
                resolve(value) {
                    expect(value).toBeTrue();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });

        it(`when pickable point exist by doubled dices for "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 3: // 4th triangle
                                return [PLAYERS.BLACK, 2];

                            default:
                                return t;
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.BLACK,
                dices: [4, 4, 4, 4],
                resolve(value) {
                    expect(value).toBeTrue();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });

        it(`when pickable point does not exist by one dice but movable for "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 4: // 5th triangle
                                return [PLAYERS.BLACK, 2];

                            default:
                                return t;
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.BLACK,
                dices: [4],
                resolve(value) {
                    expect(value).toBeTrue();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });

        it(`when pickable point does not exist by one dice but movable by higher dice for "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 4: // Triangle 5th
                                return [PLAYERS.BLACK, 2];

                            default:
                                return t;
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.BLACK,
                dices: [6],
                resolve(value) {
                    expect(value).toBeTrue();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });

        it(`when pickable point does not exist by one dice but movable even though opponent's point exist for "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 4: // 5th triangle
                                return [PLAYERS.BLACK, 2];

                            // White player triangles
                            case 0:
                                return [PLAYERS.WHITE, 1];

                            default:
                                return t;
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.BLACK,
                dices: [4],
                resolve(value) {
                    expect(value).toBeTrue();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });

        it(`when pickable point does not exist by dices but atleast one target triangle not blocked for "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 4: // 5th triangle
                                return [PLAYERS.BLACK, 2];

                            // White player triangles
                            case 0: // 1st triangle
                                return [PLAYERS.WHITE, 2];

                            default:
                                return t;
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.BLACK,
                dices: [4, 3],
                resolve(value) {
                    expect(value).toBeTrue();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });
    });

    describe('resolves false', () => {
        it(`when all triangles are blocked "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6).fill([PLAYERS.WHITE, 0]),
                roundPlayer: PLAYERS.BLACK,
                dices: [4],
                resolve(value) {
                    expect(value).toBeFalse();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });

        it(`when pickable point does not exist by one dice and not movable by blocked triangle for "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 4: // 5th triangle
                                return [PLAYERS.BLACK, 2];

                            // White player triangles
                            case 0: // 1st triangle
                                return [PLAYERS.WHITE, 2];

                            default:
                                return t;
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.BLACK,
                dices: [4],
                resolve(value) {
                    expect(value).toBeFalse();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });

        it(`when pickable points do not exist by dices and all the movable triangles are blocked for "${
            PLAYERS[PLAYERS.BLACK]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 5: // 6th triangle
                                return [PLAYERS.BLACK, 2];

                            // White player triangles
                            case 1: // 2nd triangle
                                return [PLAYERS.WHITE, 2];
                            case 3: // 4th triangle
                                return [PLAYERS.WHITE, 2];

                            default:
                                return t;
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.BLACK,
                dices: [4, 2],
                resolve(value) {
                    expect(value).toBeFalse();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });

        it(`when pickable points do not exist by dices and all the movable triangles are blocked for "${
            PLAYERS[PLAYERS.WHITE]
        }" player.`, (done) => {
            const params: Params = {
                triangles: Array(6)
                    .fill([PLAYERS.NONE, 0])
                    .map((t, i) => {
                        switch (i) {
                            // Black player triangles
                            case 0: // 1st triangle
                                return [PLAYERS.BLACK, 3];

                            // Empty triangles
                            case 4: // 5th triangle
                                return t;

                            // White player triangles
                            default:
                                return [PLAYERS.WHITE, 2];
                        }
                    })
                    .reverse(),
                roundPlayer: PLAYERS.WHITE,
                dices: [5, 5],
                resolve(value) {
                    expect(value).toBeFalse();
                    done();
                },
            };
            recursivelyCalculatePickableTriangle(params);
        });
    });
});

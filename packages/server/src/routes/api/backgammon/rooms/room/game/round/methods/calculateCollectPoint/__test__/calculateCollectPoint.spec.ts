/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    EmitCollectPointRound,
    OPPONENT,
    PLAYERS,
} from '@shared-types/backgammon';
import Round from '../../../round';
import calculateCollectPoint from '../calculateCollectPoint';

describe('calculateCollectPoint', () => {
    describe(`"${PLAYERS[PLAYERS.WHITE]}" player`, () => {
        let round: Pick<Round, 'dice' | 'layout' | 'player'> & {
                _handleNotCollected: jasmine.Spy<jasmine.Func>;
                _handleCollect: jasmine.Spy<jasmine.Func>;
            },
            data: Pick<EmitCollectPointRound, 'fromTriangleIndex'>;

        beforeEach(() => {
            round = {
                player: PLAYERS.WHITE,
                layout: Array(24).fill([PLAYERS.NONE, 0]),
                dice: [4, 1],
                _handleNotCollected: jasmine.createSpy('_handleNotCollected'),
                _handleCollect: jasmine.createSpy('_handleCollect'),
            };
            data = {
                fromTriangleIndex: 19, // 5th triangle from white's area
            };
        });

        it('calls "_handleNotCollected" when should not collect.', (done) => {
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // Black area
                    case 0: // 1st triangle
                        return [round.player, 1];

                    // White area
                    case 18: // 6th triangle
                    case 19: // 5th triangle
                    case 20: // 4th triangle
                    case 21: // 3rd triangle
                        return [round.player, 3];

                    case 22: // 2nd triangle
                    case 23: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleNotCollected).toHaveBeenCalledWith();

                expect(round._handleNotCollected).toHaveBeenCalledTimes(1);
                expect(round._handleCollect).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleNotCollected" when collectable but not pickable and movable.', (done) => {
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // White area
                    case 18: // 6th triangle
                    case 19: // 5th triangle
                        return [round.player, 3];

                    case 20: // 4th triangle
                    case 23: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleNotCollected).toHaveBeenCalledWith();

                expect(round._handleNotCollected).toHaveBeenCalledTimes(1);
                expect(round._handleCollect).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleNotCollected" with doubled dice when collectable but not pickable and movable.', (done) => {
            data.fromTriangleIndex = 20; // 4th triangle
            round.dice = [3, 3, 3, 3];
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // White area
                    case 18: // 6th triangle
                    case 19: // 5th triangle
                    case 20: // 4th triangle
                        return [round.player, 3];

                    case 23: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleNotCollected).toHaveBeenCalledWith();

                expect(round._handleNotCollected).toHaveBeenCalledTimes(1);
                expect(round._handleCollect).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleCollect" when collectable and pickable.', (done) => {
            round.dice = [3, 5];
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // White area
                    case 18: // 6th triangle
                    case 19: // 5th triangle
                        return [round.player, 3];

                    case 20: // 4th triangle
                    case 23: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleCollect).toHaveBeenCalledWith(1, 1, 4);

                expect(round._handleCollect).toHaveBeenCalledTimes(1);
                expect(round._handleNotCollected).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleCollect" when collectable, movable and pickable.', (done) => {
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // White area
                    case 18: // 6th triangle
                    case 19: // 5th triangle
                        return [round.player, 3];

                    case 23: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleCollect).toHaveBeenCalledWith(0, 2, 4);

                expect(round._handleCollect).toHaveBeenCalledTimes(1);
                expect(round._handleNotCollected).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleCollect" and dice order does not effect when collectable, movable and pickable.', (done) => {
            round.dice = [1, 4];
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // White area
                    case 18: // 6th triangle
                    case 19: // 5th triangle
                        return [round.player, 3];

                    case 23: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleCollect).toHaveBeenCalledWith(0, 2, 4);

                expect(round._handleCollect).toHaveBeenCalledTimes(1);
                expect(round._handleNotCollected).toHaveBeenCalledTimes(0);

                done();
            });
        });
    });

    describe(`"${PLAYERS[PLAYERS.BLACK]}" player`, () => {
        let round: Pick<Round, 'dice' | 'layout' | 'player'> & {
                _handleNotCollected: jasmine.Spy<jasmine.Func>;
                _handleCollect: jasmine.Spy<jasmine.Func>;
            },
            data: Pick<EmitCollectPointRound, 'fromTriangleIndex'>;

        beforeEach(() => {
            round = {
                player: PLAYERS.BLACK,
                layout: Array(24).fill([PLAYERS.NONE, 0]),
                dice: [4, 1],
                _handleNotCollected: jasmine.createSpy('_handleNotCollected'),
                _handleCollect: jasmine.createSpy('_handleCollect'),
            };
            data = {
                fromTriangleIndex: 4, // 5th triangle from white's area
            };
        });

        it('calls "_handleNotCollected" when should not collect.', (done) => {
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // White area
                    case 23: // 1st triangle
                        return [round.player, 1];

                    // Black area
                    case 5: // 6th triangle
                    case 4: // 5th triangle
                    case 3: // 4th triangle
                    case 2: // 3rd triangle
                        return [round.player, 3];

                    case 1: // 2nd triangle
                    case 0: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleNotCollected).toHaveBeenCalledWith();

                expect(round._handleNotCollected).toHaveBeenCalledTimes(1);
                expect(round._handleCollect).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleNotCollected" when collectable but not pickable and movable.', (done) => {
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // black area
                    case 5: // 6th triangle
                    case 4: // 5th triangle
                        return [round.player, 3];

                    case 3: // 4th triangle
                    case 0: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleNotCollected).toHaveBeenCalledWith();

                expect(round._handleNotCollected).toHaveBeenCalledTimes(1);
                expect(round._handleCollect).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleNotCollected" with doubled dice when collectable but not pickable and movable.', (done) => {
            data.fromTriangleIndex = 3; // 4th triangle
            round.dice = [3, 3, 3, 3];
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // Black area
                    case 5: // 6th triangle
                    case 4: // 5th triangle
                    case 3: // 4th triangle
                        return [round.player, 3];

                    case 0: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleNotCollected).toHaveBeenCalledWith();

                expect(round._handleNotCollected).toHaveBeenCalledTimes(1);
                expect(round._handleCollect).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleCollect" when collectable and pickable.', (done) => {
            round.dice = [3, 5];
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // Black area
                    case 5: // 6th triangle
                    case 4: // 5th triangle
                        return [round.player, 3];

                    case 3: // 4th triangle
                    case 0: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleCollect).toHaveBeenCalledWith(1, 1, 4);

                expect(round._handleCollect).toHaveBeenCalledTimes(1);
                expect(round._handleNotCollected).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleCollect" when collectable, movable and pickable.', (done) => {
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // Black area
                    case 5: // 6th triangle
                    case 4: // 5th triangle
                        return [round.player, 3];

                    case 0: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleCollect).toHaveBeenCalledWith(0, 2, 4);

                expect(round._handleCollect).toHaveBeenCalledTimes(1);
                expect(round._handleNotCollected).toHaveBeenCalledTimes(0);

                done();
            });
        });

        it('calls "_handleCollect" and dice order does not effect when collectable, movable and pickable.', (done) => {
            round.dice = [1, 4];
            round.layout = round.layout.map((t, i) => {
                switch (i) {
                    // Black area
                    case 5: // 6th triangle
                    case 4: // 5th triangle
                        return [round.player, 3];

                    case 0: // 1st triangle
                        return [OPPONENT[round.player], 2];

                    default:
                        return t;
                }
            });

            // @ts-ignore
            calculateCollectPoint.call(round, data).then(() => {
                expect(round._handleCollect).toHaveBeenCalledWith(0, 2, 4);

                expect(round._handleCollect).toHaveBeenCalledTimes(1);
                expect(round._handleNotCollected).toHaveBeenCalledTimes(0);

                done();
            });
        });
    });
});

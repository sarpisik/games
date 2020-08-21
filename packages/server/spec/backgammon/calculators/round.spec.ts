import { layout } from '@routes/api/backgammon/games/constants';
import { roundCalculator } from '@routes/api/backgammon/games/controller/calculators';
import { OPPONENT, PLAYERS } from '@shared-types/backgammon';
import { InvalidTriangleError } from '@shared/error';
import generateBrokens from 'spec/support/generateBrokens';

describe('backgammon/calculators/skipRound/utils/roundCalculator', () => {
    describe(`Player: "${PLAYERS[PLAYERS.WHITE]}"`, () => {
        let _data: Parameters<typeof roundCalculator>[0];
        let _round: Parameters<typeof roundCalculator>[1];

        beforeEach(() => {
            const roundId = Date.now();
            _data = {
                fromTriangleIndex: 0,
                color: 'WHITE',
                toTriangleIndex: 3,
                roundId,
                gameId: Date.now(),
            };
            _round = {
                id: roundId,
                attempt: 1,
                turn: 1,
                player: PLAYERS.WHITE,
                brokens: generateBrokens(0, 0),
                collected: generateBrokens(0, 0),
                dice: [3, 5],
                layout: JSON.parse(JSON.stringify(layout)),
            };
        });

        it(`should return new round for "${
            PLAYERS[PLAYERS.WHITE]
        }".`, (done) => {
            const result = {
                dice: _round.dice.filter((d) => d !== _data.toTriangleIndex),
                layout: layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [t[0], t[1] - 1];
                    if (i === _data.toTriangleIndex) return [PLAYERS.WHITE, 1];
                    return t;
                }),
            };

            roundCalculator(_data, _round).then((round) => {
                expect(round.dice).toEqual(result.dice);
                expect(round.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should throw error when "toTriangleIndex" is invalid for player "${
            PLAYERS[PLAYERS.WHITE]
        }".`, (done) => {
            const totriangleIndex = layout.length * 2;
            const validTriangleIndexes = [3, 8];
            const invalidTriangleError = new InvalidTriangleError(
                totriangleIndex,
                validTriangleIndexes
            );
            _data.toTriangleIndex = totriangleIndex;

            roundCalculator(_data, _round).catch((err) => {
                expect(err.payload).toEqual(invalidTriangleError.payload);
                done();
            });
        });

        it(`should return new round for "${
            PLAYERS[PLAYERS.WHITE]
        }" and increase opponent's broken point.`, (done) => {
            const round = Object.assign({}, _round, {
                // Create breakable point.
                layout: _round.layout.map((t, i) => {
                    if (i === _data.toTriangleIndex) return [PLAYERS.BLACK, 1];
                    if (i === _round.dice[1]) return [t[0], t[1] - 1];
                    return t;
                }),
            });
            const result = {
                dice: round.dice.filter((d) => d !== _data.toTriangleIndex),
                layout: round.layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [t[0], t[1] - 1];
                    if (i === _data.toTriangleIndex) return [PLAYERS.WHITE, 1];
                    return t;
                }),
                brokens: generateBrokens(0, 1),
            };

            roundCalculator(_data, round).then((round) => {
                expect(round.dice).toEqual(result.dice);
                expect(round.layout).toEqual(result.layout);
                expect(round.brokens).toEqual(result.brokens);
                done();
            });
        });

        it(`should return new round for "${
            PLAYERS[PLAYERS.WHITE]
        }" and set "from triangle" to be empty.`, (done) => {
            const round = Object.assign({}, _round, {
                // Decrease "from triangle" point so it will be empty after the mutation.
                layout: _round.layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [t[0], 1];
                    if (i === _data.toTriangleIndex) return [_round.player, 1];
                    return t;
                }),
            });
            const result = {
                dice: _round.dice.filter((d) => d !== _data.toTriangleIndex),
                layout: round.layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [0, t[1] - 1];
                    if (i === _data.toTriangleIndex) return [t[0], t[1] + 1];
                    return t;
                }),
            };

            roundCalculator(_data, round).then((round) => {
                expect(round.dice).toEqual(result.dice);
                expect(round.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should return new round for the opponent "${
            PLAYERS[OPPONENT[PLAYERS.WHITE]]
        }".`, (done) => {
            // Set only 1 dice so it will create new round for the opponent.
            _round.dice.splice(1, 1);

            const result = {
                layout: layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [t[0], t[1] - 1];
                    if (i === _data.toTriangleIndex) return [PLAYERS.WHITE, 1];
                    return t;
                }),
                player: OPPONENT[_round.player],
            };

            roundCalculator(_data, _round).then((round) => {
                expect(round.layout).toEqual(result.layout);
                expect(round.player).toEqual(result.player);
                done();
            });
        });
    });

    describe(`Player: "${PLAYERS[PLAYERS.BLACK]}"`, () => {
        let _data: Parameters<typeof roundCalculator>[0];
        let _round: Parameters<typeof roundCalculator>[1];

        const transformBlackIndex = (n = 0) => layout.length - 1 - n;

        beforeEach(() => {
            const roundId = Date.now();
            _data = {
                fromTriangleIndex: transformBlackIndex(),
                color: 'BLACK',
                toTriangleIndex: transformBlackIndex(3),
                roundId,
                gameId: Date.now(),
            };
            _round = {
                id: roundId,
                attempt: 1,
                turn: 1,
                player: PLAYERS.BLACK,
                brokens: generateBrokens(0, 0),
                collected: generateBrokens(0, 0),
                dice: [3, 5],
                layout: JSON.parse(JSON.stringify(layout)),
            };
        });

        it(`should return new round for "${
            PLAYERS[PLAYERS.BLACK]
        }".`, (done) => {
            const result = {
                dice: _round.dice.filter(
                    (d) => d !== transformBlackIndex(_data.toTriangleIndex)
                ),
                layout: layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [t[0], t[1] - 1];
                    if (i === _data.toTriangleIndex) return [PLAYERS.BLACK, 1];
                    return t;
                }),
            };

            roundCalculator(_data, _round).then((round) => {
                expect(round.dice).toEqual(result.dice);
                expect(round.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should throw error when "toTriangleIndex" is invalid for player "${
            PLAYERS[PLAYERS.BLACK]
        }".`, (done) => {
            const totriangleIndex = layout.length * -2;
            const validTriangleIndexes = [
                transformBlackIndex(3),
                transformBlackIndex(8),
            ];
            const invalidTriangleError = new InvalidTriangleError(
                totriangleIndex,
                validTriangleIndexes
            );
            _data.toTriangleIndex = totriangleIndex;

            roundCalculator(_data, _round).catch((err) => {
                expect(err.payload).toEqual(invalidTriangleError.payload);
                done();
            });
        });

        it(`should return new round for "${
            PLAYERS[PLAYERS.BLACK]
        }" and increase opponent's broken point.`, (done) => {
            const round = Object.assign({}, _round, {
                // Create breakable point.
                layout: _round.layout.map((t, i) => {
                    if (i === _data.toTriangleIndex) return [PLAYERS.WHITE, 1];
                    if (i === transformBlackIndex(_round.dice[1]))
                        return [t[0], t[1] - 1];
                    return t;
                }),
            });
            const result = {
                dice: round.dice.filter(
                    (d) => d !== transformBlackIndex(_data.toTriangleIndex)
                ),
                layout: round.layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [t[0], t[1] - 1];
                    if (i === _data.toTriangleIndex) return [PLAYERS.BLACK, 1];
                    return t;
                }),
                brokens: generateBrokens(1, 0),
            };

            roundCalculator(_data, round).then((round) => {
                expect(round.dice).toEqual(result.dice);
                expect(round.layout).toEqual(result.layout);
                expect(round.brokens).toEqual(result.brokens);
                done();
            });
        });

        it(`should return new round for "${
            PLAYERS[PLAYERS.BLACK]
        }" and set "from triangle" to be empty.`, (done) => {
            const round = Object.assign({}, _round, {
                // Decrease "from triangle" point so it will be empty after the mutation.
                layout: _round.layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [t[0], 1];
                    if (i === _data.toTriangleIndex) return [_round.player, 1];
                    return t;
                }),
            });
            const result = {
                dice: _round.dice.filter(
                    (d) => d !== transformBlackIndex(_data.toTriangleIndex)
                ),
                layout: round.layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [0, t[1] - 1];
                    if (i === _data.toTriangleIndex) return [t[0], t[1] + 1];
                    return t;
                }),
            };

            roundCalculator(_data, round).then((round) => {
                expect(round.dice).toEqual(result.dice);
                expect(round.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should return new round for the opponent "${
            PLAYERS[OPPONENT[PLAYERS.BLACK]]
        }".`, (done) => {
            // Set only 1 dice so it will create new round for the opponent.
            _round.dice.splice(1, 1);

            const result = {
                layout: layout.map((t, i) => {
                    if (i === _data.fromTriangleIndex) return [t[0], t[1] - 1];
                    if (i === _data.toTriangleIndex) return [PLAYERS.BLACK, 1];
                    return t;
                }),
                player: OPPONENT[_round.player],
            };

            roundCalculator(_data, _round).then((round) => {
                expect(round.layout).toEqual(result.layout);
                expect(round.player).toEqual(result.player);
                done();
            });
        });
    });
});

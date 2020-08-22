import { layout } from '@routes/api/backgammon/games/constants';
import {
    EmitBrokenPointRound,
    OPPONENT,
    PLAYERS,
    Round,
} from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';
import brokenPointCalculator from '../brokenPoint';

describe('backgammon/calculators/brokenPointCalculator', () => {
    const placePlayerPoint = (
        l: typeof layout,
        tIndex: number,
        triangle: number[]
    ) => l.map((t, i) => (i === tIndex ? triangle : t));

    describe(`PLAYER: "${PLAYERS[PLAYERS.WHITE]}"`, () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let data: EmitBrokenPointRound,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            round: Round = {};

        beforeEach(() => {
            data = {
                color: 'WHITE',
                toTriangleIndex: 4,
                gameId: Date.now(),
                roundId: Date.now(),
            };

            round = {
                id: data.roundId,
                attempt: 1,
                turn: 1,
                player: PLAYERS.WHITE,
                brokens: generateBrokens(1, 0),
                collected: generateBrokens(0, 0),
                dice: [2, 5],
                // Decrease 1 white point as broken.
                layout: layout.map((l, i) => (i < 1 ? [l[0], l[1] - 1] : l)),
            };
        });

        it(`should place the broken point correctly and return the result`, (done) => {
            const result = {
                brokens: generateBrokens(0, 0),
                layout: placePlayerPoint(round.layout, data.toTriangleIndex, [
                    PLAYERS.WHITE,
                    1,
                ]),
            };

            brokenPointCalculator(data, round).then((resultRound) => {
                expect(resultRound.brokens).toEqual(result.brokens);
                expect(resultRound.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should place the broken point and break the opponent's point correctly and return the result`, (done) => {
            // Place "BLACK" player's point to be broken.
            round.layout = placePlayerPoint(
                round.layout,
                data.toTriangleIndex,
                [PLAYERS.BLACK, 1]
            );

            // Decrease triangle's point where "BLACK" player's point moved from.
            const [player, points] = round.layout[data.toTriangleIndex + 1];
            round.layout = placePlayerPoint(
                round.layout,
                data.toTriangleIndex + 1,
                [player, points - 1]
            );

            const result = {
                brokens: generateBrokens(0, 1),
                layout: placePlayerPoint(round.layout, data.toTriangleIndex, [
                    PLAYERS.WHITE,
                    1,
                ]),
            };

            brokenPointCalculator(data, round).then((resultRound) => {
                expect(resultRound.brokens).toEqual(result.brokens);
                expect(resultRound.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should place the broken point and increase the itself's points correctly and return the result`, (done) => {
            // Place player to triangle where it is already taken.
            data.toTriangleIndex = 0;

            const result = {
                brokens: generateBrokens(0, 0),
                layout: placePlayerPoint(round.layout, data.toTriangleIndex, [
                    PLAYERS.WHITE,
                    2,
                ]),
            };

            brokenPointCalculator(data, round).then((resultRound) => {
                expect(resultRound.brokens).toEqual(result.brokens);
                expect(resultRound.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should place the broken point and make changes for the next round and return the result`, (done) => {
            // Pass only 1 dice to trigger next round calculations.
            round.dice = [round.dice[1]];

            const result = {
                brokens: generateBrokens(0, 0),
                layout: placePlayerPoint(round.layout, data.toTriangleIndex, [
                    PLAYERS.WHITE,
                    1,
                ]),
                player: OPPONENT[PLAYERS.WHITE],
            };

            brokenPointCalculator(data, round).then((resultRound) => {
                expect(resultRound.brokens).toEqual(result.brokens);
                expect(resultRound.layout).toEqual(result.layout);
                expect(resultRound.player).toEqual(result.player);
                expect(resultRound.dice.length).toBeGreaterThanOrEqual(2);
                expect(resultRound.dice.length).toBeLessThanOrEqual(4);
                done();
            });
        });
    });

    describe(`PLAYER: "${PLAYERS[PLAYERS.BLACK]}"`, () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let data: EmitBrokenPointRound,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            round: Round = {};

        const farthestBlack = layout.length - 1;

        beforeEach(() => {
            data = {
                color: 'BLACK',
                toTriangleIndex: farthestBlack - 4,
                gameId: Date.now(),
                roundId: Date.now(),
            };

            round = {
                id: data.roundId,
                attempt: 1,
                turn: 1,
                player: PLAYERS.BLACK,
                brokens: generateBrokens(0, 1),
                collected: generateBrokens(0, 0),
                dice: [2, 5],
                // Decrease 1 white point as broken.
                layout: layout.map((l, i) =>
                    i < farthestBlack ? [l[0], l[1] - 1] : l
                ),
            };
        });

        it(`should place the broken point correctly and return the result`, (done) => {
            const result = {
                brokens: generateBrokens(0, 0),
                layout: placePlayerPoint(round.layout, data.toTriangleIndex, [
                    PLAYERS.BLACK,
                    1,
                ]),
            };

            brokenPointCalculator(data, round).then((resultRound) => {
                expect(resultRound.brokens).toEqual(result.brokens);
                expect(resultRound.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should place the broken point and break the opponent's point correctly and return the result`, (done) => {
            // Place "WHITE" player's point to be broken.
            round.layout = placePlayerPoint(
                round.layout,
                data.toTriangleIndex,
                [PLAYERS.WHITE, 1]
            );

            // Decrease triangle's point where "WHITE" player's point moved from.
            const [player, points] = round.layout[data.toTriangleIndex - 1];
            round.layout = placePlayerPoint(
                round.layout,
                data.toTriangleIndex - 1,
                [player, points - 1]
            );

            const result = {
                brokens: generateBrokens(1, 0),
                layout: placePlayerPoint(round.layout, data.toTriangleIndex, [
                    PLAYERS.BLACK,
                    1,
                ]),
            };

            brokenPointCalculator(data, round).then((resultRound) => {
                expect(resultRound.brokens).toEqual(result.brokens);
                expect(resultRound.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should place the broken point and increase the itself's points correctly and return the result`, (done) => {
            // Place player to triangle where it is already taken.
            data.toTriangleIndex = farthestBlack;

            // Place "BLACK" player's point to be broken.
            round.layout = placePlayerPoint(
                round.layout,
                data.toTriangleIndex,
                [PLAYERS.BLACK, 1]
            );

            const result = {
                brokens: generateBrokens(0, 0),
                layout: placePlayerPoint(round.layout, data.toTriangleIndex, [
                    PLAYERS.BLACK,
                    2,
                ]),
            };

            brokenPointCalculator(data, round).then((resultRound) => {
                expect(resultRound.brokens).toEqual(result.brokens);
                expect(resultRound.layout).toEqual(result.layout);
                done();
            });
        });

        it(`should place the broken point and make changes for the next round and return the result`, (done) => {
            // Pass only 1 dice to trigger next round calculations.
            round.dice = [round.dice[1]];

            const result = {
                brokens: generateBrokens(0, 0),
                layout: placePlayerPoint(round.layout, data.toTriangleIndex, [
                    PLAYERS.BLACK,
                    1,
                ]),
                player: OPPONENT[PLAYERS.BLACK],
            };

            brokenPointCalculator(data, round).then((resultRound) => {
                expect(resultRound.brokens).toEqual(result.brokens);
                expect(resultRound.layout).toEqual(result.layout);
                expect(resultRound.player).toEqual(result.player);
                expect(resultRound.dice.length).toBeGreaterThanOrEqual(2);
                expect(resultRound.dice.length).toBeLessThanOrEqual(4);
                done();
            });
        });
    });
});

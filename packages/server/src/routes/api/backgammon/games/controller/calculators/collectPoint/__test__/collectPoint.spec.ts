import { layout } from '@routes/api/backgammon/games/constants';
import { OPPONENT, PLAYERS, Round } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';
import collectPointCalculator from '../collectPoint';
import { createEvent } from './support';

describe('collectPointCalculator', () => {
    let data: Parameters<typeof collectPointCalculator>[0];
    let round: Parameters<typeof collectPointCalculator>[1];

    const createCollectableLayout = (l: typeof layout) =>
        l.map((t, i) => {
            const triangle: typeof t = [t[0], t[1]];

            // Delete white points where outside of collect area
            if (t[0] === PLAYERS.WHITE) {
                triangle[0] = PLAYERS.NONE;
                triangle[1] = 0;
            }

            // Create white points where inside of collect area
            const isWhitePlayer = t[0] !== PLAYERS.BLACK;
            const createWhite = isWhitePlayer && i >= 18;
            if (createWhite) {
                triangle[0] = PLAYERS.WHITE;
                triangle[1] = 3;
            }

            return triangle;
        });
    const createResultLayout = (
        l: typeof layout,
        index: number,
        player: Round['player']
    ) =>
        l.map((t, i) => {
            // Decrease by one at collected point triangle
            if (i === index) return [player, t[1] - 1];
            return t;
        });

    beforeEach(() => {
        const roundId = Date.now();
        const playersIndex = generateBrokens(0, 0);
        data = {
            fromTriangleIndex: 18,
            color: 'WHITE',
            gameId: Date.now(),
            roundId,
        };
        round = {
            id: roundId,
            attempt: 1,
            turn: 1,
            player: PLAYERS.WHITE,
            brokens: playersIndex,
            collected: playersIndex,
            layout,
            dice: [4, 6],
        };
    });

    it('should collect only one of the dices', (done) => {
        data.fromTriangleIndex = 22; // 2
        round.dice = [2, 1];
        round.layout = createCollectableLayout(layout).map((t, i) => {
            if (i < data.fromTriangleIndex) return [PLAYERS.NONE, 0];

            // Move WHITE points to 2nd
            if (i === data.fromTriangleIndex) return [PLAYERS.WHITE, 2];
            return t;
        });
        const resultRound = {
            layout: createResultLayout(
                round.layout,
                data.fromTriangleIndex,
                PLAYERS.WHITE
            ),
            dice: round.dice.slice(1),
        };

        collectPointCalculator(data, round).then((r) => {
            const result = r as Round;
            expect(result.layout).toEqual(resultRound.layout);
            expect(result.dice).toEqual(resultRound.dice);
            done();
        });
    });

    it('should not collect point', (done) => {
        const event = createEvent(round);

        collectPointCalculator(data, round).then((result) => {
            expect(result).toEqual(event);
            done();
        });
    });

    it('should collect point when dice and triangle are equal', (done) => {
        round.layout = createCollectableLayout(layout);
        const resultRound = {
            layout: createResultLayout(round.layout, 18, PLAYERS.WHITE),
            dice: round.dice.slice(0, 1),
        };

        collectPointCalculator(data, round).then((r) => {
            const result = r as Round;
            expect(result.layout).toEqual(resultRound.layout);
            expect(result.dice).toEqual(resultRound.dice);
            done();
        });
    });

    it('should collect point when dice and triangle are not equal', (done) => {
        data.fromTriangleIndex = 19;
        round.layout = createCollectableLayout(layout).map((t, i) => {
            // Move points from 6th triangle to 5th
            if (i === 18) return [PLAYERS.NONE, 0];
            if (i === 19) {
                t[1] = t[1] + 3;
            }
            return t;
        });
        const resultRound = {
            layout: createResultLayout(round.layout, 19, PLAYERS.WHITE),
            dice: round.dice.slice(0, 1),
        };

        collectPointCalculator(data, round).then((r) => {
            const result = r as Round;
            expect(result.layout).toEqual(resultRound.layout);
            expect(result.dice).toEqual(resultRound.dice);
            done();
        });
    });

    it('should not collect, movable but the dice is invalid', (done) => {
        data.fromTriangleIndex = 19;
        round.dice = [4, 1];
        round.layout = createCollectableLayout(layout).map((t, i) => {
            // Move points from 6th triangle to 5th
            if (i === 18) return [PLAYERS.NONE, 0];
            if (i === 19) {
                t[1] = t[1] + 3;
            }
            return t;
        });
        const event = createEvent(round);

        collectPointCalculator(data, round).then((result) => {
            expect(result).toEqual(event);
            done();
        });
    });

    it('should collect point when when movable', (done) => {
        data.fromTriangleIndex = 19;
        round.dice = [4, 1];
        round.layout = createCollectableLayout(layout).map((t, i) => {
            // Remove black point from 1th triangle
            if (i === 23) return [PLAYERS.NONE, 0];

            // Move points from 6th and 5th triangle to 4th
            if (i === 18) return [PLAYERS.NONE, 0];
            if (i === 19) t[1] = t[1] + 3;

            return t;
        });
        const resultRound = {
            layout: createResultLayout(
                round.layout,
                data.fromTriangleIndex,
                PLAYERS.WHITE
            ),
            player: OPPONENT[PLAYERS.WHITE],
        };

        collectPointCalculator(data, round).then((r) => {
            const result = r as Round;
            expect(result.layout).toEqual(resultRound.layout);
            expect(result.player).toEqual(resultRound.player);
            done();
        });
    });
});

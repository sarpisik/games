import { layout } from '@routes/api/backgammon/games/constants';
import { PLAYERS, OPPONENT } from '@shared-types/backgammon';
import calculatedDoubleDiceMovable from '../calculatedDoubleDiceMovable';

type Params = Parameters<typeof calculatedDoubleDiceMovable>[0];

export const generateDoubledDice = (dice: number) =>
    Array(dice)
        .fill(dice)
        .map((dice, i) => dice * (i + 1));

describe('calculatedDoubleDiceMovable', () => {
    const createArea = (
        player: PLAYERS.WHITE | PLAYERS.BLACK,
        startIndex: number
    ) =>
        layout.slice(0, 6).map((_, i) => {
            if (i < startIndex) return [PLAYERS.NONE, 0];
            return [player, 3];
        });

    it('should return true when the point is movable', (done) => {
        const player = PLAYERS.WHITE;
        const validDices = generateDoubledDice(4);
        const startIndex = validDices[0] + 1;
        const area = createArea(player, startIndex);
        const params: Params = {
            layout: area,
            validDices,
            startIndex,
            player,
        };

        calculatedDoubleDiceMovable(params).then((doubleDiceMovable) => {
            expect(doubleDiceMovable).toBeTrue();
            done();
        });
    });

    it(`should return true when there is atleast one breakable "${
        PLAYERS[OPPONENT[PLAYERS.WHITE]]
    }"'s point on the triangles.`, (done) => {
        const player = PLAYERS.WHITE;
        const validDices = generateDoubledDice(4);
        const startIndex = validDices[0] + 1;
        const area = createArea(player, startIndex).map((t, i) => {
            if (i === validDices[0] - 1) return [OPPONENT[player], 1];
            return t;
        });
        const params: Params = {
            layout: area,
            validDices,
            startIndex,
            player,
        };

        calculatedDoubleDiceMovable(params).then((doubleDiceMovable) => {
            expect(doubleDiceMovable).toBeTrue();
            done();
        });
    });

    it('should return false when there is atleast one blocked triangle on the way.', (done) => {
        const player = PLAYERS.WHITE;
        const validDices = generateDoubledDice(4);
        const startIndex = validDices[0] + 1;
        const area = createArea(player, startIndex).map((t, i) => {
            if (i === validDices[0] - 1) return [OPPONENT[player], 2];
            return t;
        });
        const params: Params = {
            layout: area,
            validDices,
            startIndex,
            player,
        };

        calculatedDoubleDiceMovable(params).then((doubleDiceMovable) => {
            expect(doubleDiceMovable).toBeFalse();
            done();
        });
    });
});

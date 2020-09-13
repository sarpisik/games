import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { OPPONENT, PLAYERS } from '@shared-types/backgammon';
import { generateValidDices } from 'spec/support/generateValidDices';
import calculateDiceMovable from '../calculateDiceMovable';

type Params = Parameters<typeof calculateDiceMovable>[0];

export const createArea = (
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    startIndex: number
) =>
    layout.slice(0, 6).map((_, i) => {
        if (i < startIndex) return [PLAYERS.NONE, 0];
        return [player, 3];
    });

describe('calculateDiceMovable', () => {
    const generateParams = (
        validDices: Params['validDices'],
        layout: Params['layout'],
        startIndex: Params['startIndex'],
        player: Params['player']
    ): Params => ({ validDices, layout, startIndex, player });

    it('should return true when movable', (done) => {
        const player = PLAYERS.WHITE;
        const startIndex = 5;
        const layout = createArea(player, startIndex);
        const validDices = generateValidDices(3, 4);
        const params = generateParams(validDices, layout, startIndex, player);

        calculateDiceMovable(params).then((movable) => {
            expect(movable).toBeTrue();
            done();
        });
    });

    it('should return false when movable and dices are higher than start point.', (done) => {
        const player = PLAYERS.WHITE;
        const startIndex = 2;
        const layout = createArea(player, startIndex);
        const validDices = generateValidDices(3, 4);
        const params = generateParams(validDices, layout, startIndex, player);

        calculateDiceMovable(params).then((movable) => {
            expect(movable).toBeFalse();
            done();
        });
    });

    it('should return false when the triangle is blocked.', (done) => {
        const player = PLAYERS.WHITE;
        const startIndex = 3;
        const validDices = generateValidDices(3, 4);
        const layout = createArea(player, startIndex).map((t, i) => {
            if (i === validDices[0] - 1) return [OPPONENT[PLAYERS.WHITE], 2];
            return t;
        });
        const params = generateParams(validDices, layout, startIndex, player);

        calculateDiceMovable(params).then((movable) => {
            expect(movable).toBeFalse();
            done();
        });
    });
});

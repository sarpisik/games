import { layout } from '@routes/api/backgammon/games/constants';
import { PLAYERS } from '@shared-types/backgammon';
import { generateDoubledDice } from 'spec/support/generateDoubleDice';
import { generateValidDices } from 'spec/support/generateValidDices';
import calculateMovable from '../calculateMovable';

type Params = Parameters<typeof calculateMovable>[0];

describe('calculateMovable', () => {
    const createArea = (
        player: PLAYERS.WHITE | PLAYERS.BLACK,
        startIndex: number
    ) =>
        layout.slice(0, 6).map((_, i) => {
            if (i < startIndex) return [PLAYERS.NONE, 0];
            return [player, 3];
        });
    const generateParams = (
        isDouble: Params['isDouble'],
        possibleDices: Params['possibleDices'],
        startIndex: Params['startIndex'],
        player: Params['player'],
        layout: Params['layout']
    ): Params => ({ isDouble, possibleDices, startIndex, player, layout });

    it('should use calculatedDoubleDiceMovable on double dice and return true', (done) => {
        const player = PLAYERS.WHITE;
        const startIndex = 5;
        const layout = createArea(player, startIndex);
        const validDices = generateDoubledDice(3);
        const params = generateParams(
            true,
            validDices,
            startIndex,
            player,
            layout
        );

        calculateMovable(params).then((movable) => {
            expect(movable).toBeTrue();
            done();
        });
    });

    it('should use calculateDiceMovable on double dice and return true', (done) => {
        const player = PLAYERS.WHITE;
        const startIndex = 5;
        const layout = createArea(player, startIndex);
        const validDices = generateValidDices(3, 4);
        const params = generateParams(
            false,
            validDices,
            startIndex,
            player,
            layout
        );

        calculateMovable(params).then((movable) => {
            expect(movable).toBeTrue();
            done();
        });
    });
});

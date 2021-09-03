import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { PLAYERS } from '@shared-types/backgammon';
import calculateUsedDices from '../calculateUsedDices';
import { createArea } from '../utils/calculateMovable/utils/calculateDiceMovable/__test__/calculateDiceMovable.spec';

type Params = Parameters<typeof calculateUsedDices>[0];

describe('calculateUsedDices', () => {
    let _params: Params;

    beforeEach(() => {
        _params = {
            dices: [3, 1],
            startIndex: 3,
            player: PLAYERS.WHITE,
            layout,
        };
    });

    it('should return used dices', (done) => {
        const result = [0, 1];

        calculateUsedDices(_params).then((usedDiceIndexes) => {
            expect(usedDiceIndexes).toEqual(result);
            done();
        });
    });

    it('should return an empty array when not movable', (done) => {
        const result: number[] = [];
        const startIndex = 4;
        const dices = [3, 4];
        const params = Object.assign({}, _params, {
            dices,
            layout: createArea(_params.player, startIndex).map((t, i) => {
                switch (i) {
                    case 0: // 1st triangle
                    case 1: // 2nd triangle
                        return [PLAYERS.BLACK, 2];

                    default:
                        return t;
                }
            }),
            startIndex,
        });

        calculateUsedDices(params).then((usedDiceIndexes) => {
            expect(usedDiceIndexes).toEqual(result);
            done();
        });
    });

    it('should return an empty array when not in the stack', (done) => {
        const result: number[] = [];
        _params.startIndex = 4;

        calculateUsedDices(_params).then((usedDiceIndexes) => {
            expect(usedDiceIndexes).toEqual(result);
            done();
        });
    });
});

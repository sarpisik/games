import { layout } from '@routes/api/backgammon/games/constants';
import { calculateSkipRound } from '@routes/api/backgammon/games/controller/calculators';
import { PLAYERS } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';

describe('backgammon/calculators/skipRound/utils/calculateSkipRound', () => {
    let _params: Parameters<typeof calculateSkipRound>[0];

    beforeEach(() => {
        _params = {
            id: Date.now(),
            attempt: 1,
            turn: 1,
            player: PLAYERS.WHITE,
            brokens: generateBrokens(0, 0),
            collected: generateBrokens(0, 0),
            dice: [2, 5],
            layout,
        };
    });

    it(`should return false when there is placeable triangle exist for "${
        PLAYERS[PLAYERS.WHITE]
    }".`, (done) => {
        const params = Object.assign({}, _params, {
            layout: layout.map((t, i) => {
                if (i < 1) return [t[0], t[1] - 1];
                return t;
            }),
        });

        calculateSkipRound(params).then((placeable) => {
            expect(placeable).toBeFalse();
            done();
        });
    });

    it(`should return false when "${
        PLAYERS[PLAYERS.WHITE]
    }" has broken point and can be placeable.`, (done) => {
        const params = Object.assign({}, _params, {
            brokens: generateBrokens(1, 0),
        });

        calculateSkipRound(params).then((placeable) => {
            expect(placeable).toBeFalse();
            done();
        });
    });

    it(`should return false when there is placeable triangle exist for "${
        PLAYERS[PLAYERS.BLACK]
    }".`, (done) => {
        const params = Object.assign({}, _params, { player: PLAYERS.BLACK });

        calculateSkipRound(params).then((placeable) => {
            expect(placeable).toBeFalse();
            done();
        });
    });

    it(`should return false when "${
        PLAYERS[PLAYERS.BLACK]
    }" has broken point and can be placeable.`, (done) => {
        const params = Object.assign({}, _params, {
            player: PLAYERS.BLACK,
            brokens: generateBrokens(0, 1),
        });

        calculateSkipRound(params).then((placeable) => {
            expect(placeable).toBeFalse();
            done();
        });
    });
});

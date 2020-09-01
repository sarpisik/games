import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { calculateAvailableTriangleForBrokens } from '@routes/api/backgammon/rooms/room/game/helpers/skipRound/utils';
import { OPPONENT, PLAYERS } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';

describe('backgammon/calculators/skipRound/utils/calculateAvailableTriangleForBrokens', () => {
    let _params: Parameters<typeof calculateAvailableTriangleForBrokens>[0];

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

    it(`should return true when there is placeable triangle exist for "${
        PLAYERS[PLAYERS.WHITE]
    }".`, (done) => {
        const params = Object.assign({}, _params, {
            layout: layout.map((t, i) => {
                if (i < 1) return [t[0], t[1] - 1];
                return t;
            }),
        });

        calculateAvailableTriangleForBrokens(params).then((placeable) => {
            expect(placeable).toBeTrue();
            done();
        });
    });

    it(`should return false when there is no placeable triangle exist for "${
        PLAYERS[PLAYERS.WHITE]
    }".`, (done) => {
        const params = Object.assign({}, _params, {
            // Blocked triangle indexes
            dice: [2, 6],
            // Block tirangles according to above dices
            layout: layout.map((t, i) => {
                if (i === 1) return [OPPONENT[PLAYERS.WHITE], 2];
                return t;
            }),
        });

        calculateAvailableTriangleForBrokens(params).then((placeable) => {
            expect(placeable).toBeFalse();
            done();
        });
    });

    it(`should return true when there is placeable triangle exist for "${
        PLAYERS[PLAYERS.BLACK]
    }".`, (done) => {
        const params = Object.assign({}, _params, {
            player: PLAYERS.BLACK,
            layout: layout.map((t, i) => {
                if (i === layout.length - 1) return [t[0], t[1] - 1];
                return t;
            }),
        });

        calculateAvailableTriangleForBrokens(params).then((placeable) => {
            expect(placeable).toBeTrue();
            done();
        });
    });

    it(`should return true when there is placeable triangle exist for "${
        PLAYERS[PLAYERS.BLACK]
    }" and the dice is double..`, (done) => {
        const params = Object.assign({}, _params, {
            dice: Array(4).fill(2),
            player: PLAYERS.BLACK,
            layout: layout.map((t, i) => {
                if (i === layout.length - 1) return [t[0], t[1] - 1];
                return t;
            }),
        });

        calculateAvailableTriangleForBrokens(params).then((placeable) => {
            expect(placeable).toBeTrue();
            done();
        });
    });

    // it(`should return false when there is no movable triangle exist for "${
    //     PLAYERS[PLAYERS.WHITE]
    // }".`, (done) => {
    //     _params.dice = [5, 5];
    //     _params.layout = layout.map((t, i) => {
    //         if (i < 1) return [t[0], t[1] + 3];
    //         if (i === 16) return [PLAYERS.BLACK, 2];
    //         return t;
    //     });

    //     calculateAvailableTriangleForBrokens(_params).then((movable) => {
    //         expect(movable).toBeFalse();
    //         done();
    //     });
    // });

    // it(`should return true when there is movable triangle exist for "${
    //     PLAYERS[PLAYERS.BLACK]
    // }".`, (done) => {
    //     _params.player = PLAYERS.BLACK;

    //     calculateAvailableTriangleForBrokens(_params).then((movable) => {
    //         expect(movable).toBeTrue();
    //         done();
    //     });
    // });
});

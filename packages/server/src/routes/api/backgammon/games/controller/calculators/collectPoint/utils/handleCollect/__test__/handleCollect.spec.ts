import handleCollect from '../handleCollect';
import { PLAYERS } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';
import { layout } from '@routes/api/backgammon/games/constants';

type Params = Parameters<typeof handleCollect>[0];

describe('handleCollect', () => {
    let _params: Params;

    beforeEach(() => {
        _params = {
            round: {
                id: Date.now(),
                attempt: 0,
                turn: 1,
                player: PLAYERS.WHITE,
                brokens: generateBrokens(0, 0),
                collected: generateBrokens(0, 0),
                dice: [4, 3],
                layout: layout.slice(0, 6),
            },
            triangleIndex: 20,
            deleteDicesFrom: 0,
            deleteDicesCount: 1,
            player: PLAYERS.WHITE,
        };
    });

    it(`should decrease by 1 triangle point and create new round for "${
        PLAYERS[PLAYERS.BLACK]
    }" player.`, (done) => {
        const diceToBeUsed = _params.round.dice[0];
        _params.round.layout = _params.round.layout.map((t, i) => {
            if (i < diceToBeUsed) return [PLAYERS.BLACK, 2];
            return t;
        });
        _params.round.player = PLAYERS.BLACK;
        _params.triangleIndex = 3;
        _params.player = PLAYERS.BLACK;
        const round = {
            dices: [3],
            layout: (JSON.parse(
                JSON.stringify(_params.round.layout)
            ) as typeof layout).map((t, i) => {
                if (i === diceToBeUsed - 1) return [t[0], t[1] - 1];
                return t;
            }),
        };

        handleCollect(_params).then((result) => {
            expect(result.dice).toEqual(round.dices);
            expect(result.layout).toEqual(round.layout);
            done();
        });
    });

    it(`should decrease by 1 triangle point and create new round for "${
        PLAYERS[PLAYERS.WHITE]
    }" player.`, (done) => {
        const diceToBeUsed = _params.round.dice[0];
        _params.round.layout = _params.round.layout.map((t, i) => {
            if (i < diceToBeUsed) return [PLAYERS.WHITE, 2];
            return t;
        });
        const round = {
            dices: [3],
            layout: (JSON.parse(
                JSON.stringify(_params.round.layout)
            ) as typeof layout).map((t, i) => {
                if (i === diceToBeUsed - 1) return [t[0], t[1] - 1];
                return t;
            }),
        };

        handleCollect(_params).then((result) => {
            expect(result.dice).toEqual(round.dices);
            expect(result.layout).toEqual(round.layout);
            done();
        });
    });

    it(`should triangle empty and create new round for "${
        PLAYERS[PLAYERS.WHITE]
    }" player.`, (done) => {
        const diceToBeUsed = _params.round.dice[0];
        _params.round.layout = _params.round.layout.map((t, i) => {
            if (i < diceToBeUsed) return [PLAYERS.WHITE, 1];
            return t;
        });
        const round = {
            dices: [3],
            layout: (JSON.parse(
                JSON.stringify(_params.round.layout)
            ) as typeof layout).map((t, i) => {
                if (i === diceToBeUsed - 1) return [PLAYERS.NONE, t[1] - 1];
                return t;
            }),
        };

        handleCollect(_params).then((result) => {
            expect(result.dice).toEqual(round.dices);
            expect(result.layout).toEqual(round.layout);
            done();
        });
    });

    it(`should collect the point and create new round for "${
        PLAYERS[PLAYERS.WHITE]
    }"'s opponent "${PLAYERS[PLAYERS.BLACK]}" player.`, (done) => {
        _params.round.dice.splice(1, 1);
        const diceToBeUsed = _params.round.dice[0];
        _params.round.layout = _params.round.layout.map((t, i) => {
            if (i < diceToBeUsed) return [PLAYERS.WHITE, 2];
            return t;
        });
        const round = {
            dices: [],
            layout: (JSON.parse(
                JSON.stringify(_params.round.layout)
            ) as typeof layout).map((t, i) => {
                if (i === diceToBeUsed - 1) return [t[0], t[1] - 1];
                return t;
            }),
            player: PLAYERS.BLACK,
        };

        handleCollect(_params).then((result) => {
            expect(result.layout).toEqual(round.layout);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            expect(result.player).toEqual(round.player);
            done();
        });
    });
});

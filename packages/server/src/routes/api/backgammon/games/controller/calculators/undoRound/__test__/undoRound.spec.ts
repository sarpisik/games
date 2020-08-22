import { layout } from '@routes/api/backgammon/games/constants';
import { undoRoundCalculator } from '@routes/api/backgammon/games/controller/calculators';
import { PLAYERS, Round } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';

describe('backgammon/calculators/undoRoundCalculator', () => {
    const _rounds: Round[] = [
        {
            id: Date.now(),
            player: PLAYERS.WHITE,
            attempt: 1,
            turn: 1,
            brokens: generateBrokens(0, 0),
            collected: generateBrokens(0, 0),
            dice: [1, 2],
            layout,
        },
        {
            id: Date.now(),
            player: PLAYERS.WHITE,
            attempt: 1,
            turn: 1,
            brokens: generateBrokens(0, 0),
            collected: generateBrokens(0, 0),
            dice: [1, 2],
            layout,
        },
    ];

    it(`should calculate the rounds correctly and return the last round.`, (done) => {
        const rounds = _rounds.slice(0, 1);

        undoRoundCalculator(_rounds).then((round) => {
            expect(round).toEqual(rounds);
            done();
        });
    });

    it(`should calculate the rounds correctly and return the same round when rounds are only one.`, (done) => {
        undoRoundCalculator([]).then((result) => {
            expect(result).toEqual([]);
            done();
        });
    });

    it(`should calculate the rounds correctly and return the same round`, (done) => {
        const rounds = _rounds.slice(0, 1);

        undoRoundCalculator(rounds).then((result) => {
            expect(result).toEqual(rounds);
            done();
        });
    });

    it(`should calculate the rounds correctly and return the same round when round players are different.`, (done) => {
        const rounds = _rounds.map((r, i) => {
            if (i < 1) r = Object.assign({}, r, { player: PLAYERS.BLACK });
            return r;
        });

        undoRoundCalculator(rounds).then((result) => {
            expect(result).toEqual(rounds);
            done();
        });
    });
});

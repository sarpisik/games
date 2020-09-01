import { PLAYERS, Round } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';
import { layout } from '../../../constants';
import calculateStageOver from '../stageOver';

describe('backgammon/calculators/calculateStageOver', () => {
    const _round: Round = {
        id: Date.now(),
        player: PLAYERS.WHITE,
        attempt: 1,
        turn: 1,
        brokens: generateBrokens(0, 0),
        collected: generateBrokens(0, 0),
        dice: [1, 2],
        layout,
    };

    it(`should calculate correctly and return no winner.`, (done) => {
        calculateStageOver(_round).then((round) => {
            expect(round).toEqual(null);
            done();
        });
    });

    it(`should calculate correctly and return "${
        PLAYERS[PLAYERS.WHITE]
    }" as winner.`, (done) => {
        const round = Object.assign({}, _round, {
            collected: generateBrokens(15, 0),
        });

        calculateStageOver(round).then((result) => {
            expect(result).toEqual({ winner: PLAYERS.WHITE });
            done();
        });
    });

    it(`should calculate correctly and return "${
        PLAYERS[PLAYERS.BLACK]
    }" as winner.`, (done) => {
        const round = Object.assign({}, _round, {
            collected: generateBrokens(14, 15),
        });

        calculateStageOver(round).then((result) => {
            expect(result).toEqual({ winner: PLAYERS.BLACK });
            done();
        });
    });
});

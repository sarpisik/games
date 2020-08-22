import { Game, PLAYERS } from '@shared-types/backgammon';
import calculateGameOver from '../gameOver';

describe('backgammon/calculators/gameOver', () => {
    let stage: Game['stages'], score: Game['score'];

    describe(`PLAYER: "${PLAYERS[PLAYERS.WHITE]}"`, () => {
        beforeEach(() => {
            stage = 3;
            score = { [PLAYERS.WHITE]: 3, [PLAYERS.BLACK]: 2 };
        });

        it(`should calculate the winner correctly and return the result`, (done) => {
            calculateGameOver(stage, score).then((result) => {
                expect(result).toEqual([
                    PLAYERS.WHITE.toString(),
                    score[PLAYERS.WHITE],
                ]);
                done();
            });
        });

        it(`should calculate the winner correctly and return the invalid result`, (done) => {
            score[PLAYERS.WHITE] = 2;

            calculateGameOver(stage, score).then((result) => {
                expect(result).toEqual(null);
                done();
            });
        });

        it(`should consider mars and calculate the winner correctly then return the result`, (done) => {
            const whitePlayer = PLAYERS.WHITE;
            score[whitePlayer] = 4;

            calculateGameOver(stage, score).then((result) => {
                expect(result).toEqual([
                    whitePlayer.toString(),
                    score[whitePlayer],
                ]);
                done();
            });
        });
    });

    describe(`PLAYER: "${PLAYERS[PLAYERS.BLACK]}"`, () => {
        beforeEach(() => {
            stage = 3;
            score = { [PLAYERS.BLACK]: 3, [PLAYERS.WHITE]: 2 };
        });

        it(`should calculate the winner correctly and return the result`, (done) => {
            calculateGameOver(stage, score).then((result) => {
                expect(result).toEqual([
                    PLAYERS.BLACK.toString(),
                    score[PLAYERS.BLACK],
                ]);
                done();
            });
        });

        it(`should calculate the winner correctly and return the invalid result`, (done) => {
            score[PLAYERS.BLACK] = 2;

            calculateGameOver(stage, score).then((result) => {
                expect(result).toEqual(null);
                done();
            });
        });
    });
});

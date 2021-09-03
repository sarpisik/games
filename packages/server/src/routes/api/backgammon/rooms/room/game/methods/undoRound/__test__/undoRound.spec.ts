/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PLAYERS } from '@shared-types/backgammon';
import { Round } from '../../../round';
import undoRound from '../undoRound';

describe('undoRound', () => {
    let backgammonGame: { rounds: Array<Pick<Round, 'player'>> };

    beforeEach(() => {
        backgammonGame = {
            rounds: [{ player: PLAYERS.WHITE }, { player: PLAYERS.BLACK }],
        };
    });

    it('should not undo round when there is no prior round', (done) => {
        backgammonGame.rounds = [];

        // @ts-ignore
        undoRound.call(backgammonGame).then(() => {
            expect(backgammonGame.rounds).toEqual([]);
            expect(backgammonGame.rounds.length).toBe(0);
            done();
        });
    });

    it('should not undo round when the players are not same', (done) => {
        // @ts-ignore
        undoRound.call(backgammonGame).then(() => {
            expect(backgammonGame.rounds.length).toBe(2);
            done();
        });
    });

    it('should undo round', (done) => {
        const result = backgammonGame.rounds.slice(0, 1);
        backgammonGame.rounds[backgammonGame.rounds.length - 1].player =
            PLAYERS.WHITE;

        // @ts-ignore
        undoRound.call(backgammonGame).then(() => {
            expect(backgammonGame.rounds.length).toBe(1);
            expect(backgammonGame.rounds).toEqual(result);
            done();
        });
    });
});

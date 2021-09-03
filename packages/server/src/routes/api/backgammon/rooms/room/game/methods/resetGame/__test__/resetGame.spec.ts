/* eslint-disable @typescript-eslint/ban-ts-comment */
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import { Round } from '../../../round';
import resetGame from '../resetGame';

describe('resetGame', () => {
    let backgammonGame: Pick<
        BackgammonGame,
        'id' | 'duration' | 'timer' | 'stages' | 'score' | 'rounds'
    > & {
        players: {
            [key in Round['player']]: { id: number } | null;
        };
    };

    beforeEach(() => {
        const duration = 120;

        backgammonGame = {
            id: 1,
            duration,
            players: generatePlayersObj(
                { id: Date.now() },
                { id: Date.now() + 1 }
            ),
            timer: generatePlayersObj(duration, duration),
            stages: 5,
            score: generatePlayersObj(3, 5),
            rounds: [],
        };
    });

    it('reset game', () => {
        // @ts-ignore
        resetGame.call(backgammonGame);

        expect(backgammonGame.duration).toBe(120);
        expect(backgammonGame.players).toEqual(generatePlayersObj(null, null));
        expect(backgammonGame.timer).toEqual(generatePlayersObj(120, 120));
        expect(backgammonGame.stages).toBe(5);
        expect(backgammonGame.score).toEqual(generatePlayersObj(0, 0));
        expect(backgammonGame.rounds).toEqual([]);
    });

    it('reset game with default values', () => {
        delete backgammonGame.duration;
        delete backgammonGame.stages;

        // @ts-ignore
        resetGame.call(backgammonGame);

        expect(backgammonGame.duration).toBe(60);
        expect(backgammonGame.players).toEqual(generatePlayersObj(null, null));
        expect(backgammonGame.timer).toEqual(generatePlayersObj(60, 60));
        expect(backgammonGame.stages).toBe(1);
        expect(backgammonGame.score).toEqual(generatePlayersObj(0, 0));
        expect(backgammonGame.rounds).toEqual([]);
    });
});

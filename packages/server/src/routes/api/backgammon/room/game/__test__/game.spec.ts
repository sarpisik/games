import BackgammonGame from '../game';
import { generatePlayersObj } from '../helpers';

describe('BackgammonGame', () => {
    it('should create base game class.', () => {
        const gameId = 0;
        const duration = 60;
        const game = new BackgammonGame(gameId);

        expect(game.id).toBe(gameId);
        expect(game.stages).toBe(1);
        expect(game.duration).toBe(duration);
        expect(game.rounds).toEqual([]);
        expect(game.timer).toEqual(generatePlayersObj(duration, duration));
        expect(game.players).toEqual(generatePlayersObj(-1, -1));
        expect(game.score).toEqual(generatePlayersObj(0, 0));
    });
});

import BackgammonGame from '../game';
import { generatePlayersObj } from '../helpers';

describe('BackgammonGame', () => {
    it('should create base game class.', () => {
        const roomId = 0;
        const gameId = 0;
        const duration = 60;

        const io = jasmine.createSpyObj('io', ['of']);
        const ofSpy = jasmine.createSpyObj('of', ['use', 'on', 'emit']);
        (io.of as jasmine.Spy).and.callFake(() => ofSpy);

        const disconnectCb = jasmine.createSpy('disconnectCb');
        const connectCb = jasmine.createSpy('connectCb');
        const game = new BackgammonGame(
            gameId,
            roomId,
            io,
            disconnectCb,
            connectCb
        );

        expect(ofSpy.use).toHaveBeenCalled();
        expect(ofSpy.on).toHaveBeenCalled();

        expect(game.id).toBe(gameId);
        expect(game.stages).toBe(1);
        expect(game.duration).toBe(duration);
        expect(game.rounds).toEqual([]);
        expect(game.timer).toEqual(generatePlayersObj(duration, duration));
        // expect(game.players).toEqual(generatePlayersObj(-1, -1));
        expect(game.score).toEqual(generatePlayersObj(0, 0));
    });
});

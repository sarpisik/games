import BackgammonRoom from '../room';
import { BackgammonGame } from '../game';

describe('BackgammonRoom', () => {
    it('should create games when constructed.', () => {
        const roomId = 0;
        const room = new BackgammonRoom(roomId);

        expect(room.id).toBe(roomId);
        expect(room.games.length).toBe(10);
        room.games.forEach((game) => {
            expect(game).toBeInstanceOf(BackgammonGame);
        });
    });
});

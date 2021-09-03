import BackgammonRoom from '../room';
import { BackgammonGame } from '../game';

describe('BackgammonRoom', () => {
    it('should create games when constructed.', () => {
        const roomId = 0;

        const io = jasmine.createSpyObj('io', ['of']);
        const ofSpy = jasmine.createSpyObj('of', ['use', 'on', 'emit']);
        (io.of as jasmine.Spy).and.callFake(() => ofSpy);
        const clientJoinRoomCb = jasmine.createSpy('clientJoinRoomCb');

        const room = new BackgammonRoom(roomId, io, clientJoinRoomCb);

        expect(room.id).toBe(roomId);
        expect(room._games.size).toBe(10);

        expect(ofSpy.use).toHaveBeenCalled();
        expect(ofSpy.on).toHaveBeenCalled();

        room._games.forEach((game) => {
            expect(game).toBeInstanceOf(BackgammonGame);
        });
    });
});

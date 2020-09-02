/* eslint-disable @typescript-eslint/ban-ts-comment */
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import handleDisconnect from '../handleDisconnect';
import { GAME_EVENTS } from '@shared-types/game';
import { PLAYERS } from '@shared-types/backgammon';

describe('handleDisconnect', () => {
    let backgammonGame: Pick<BackgammonGame, 'id' | 'players' | '_users'> & {
            _resetGame: jasmine.Spy<jasmine.Func>;
        },
        clientId: string,
        socket: { broadcast: { emit: jasmine.Spy<jasmine.Func> } },
        disconnectCb: jasmine.Spy<jasmine.Func>;

    beforeEach(() => {
        backgammonGame = {
            id: Date.now(),
            players: generatePlayersObj(null, null),
            _users: new Map(),
            _resetGame: jasmine.createSpy(),
        };
        clientId = 'a-unique-client-id';
        socket = { broadcast: { emit: jasmine.createSpy() } };
        disconnectCb = jasmine.createSpy();
    });

    it('should does nothing when disconnected client is not in the connected list', () => {
        // @ts-ignore
        handleDisconnect.call(backgammonGame, clientId, socket, disconnectCb)();

        expect(backgammonGame.players).toEqual(generatePlayersObj(null, null));
        expect(socket.broadcast.emit).toHaveBeenCalledTimes(0);
        expect(disconnectCb).toHaveBeenCalledTimes(0);
    });

    it('should delete user from connected users list only when user is not player.', () => {
        // register to users list
        const mockUser = { id: Date.now().toString(), name: 'Mock User' };
        // @ts-ignore
        backgammonGame._users.set(clientId, mockUser);

        // @ts-ignore
        handleDisconnect.call(backgammonGame, clientId, socket, disconnectCb)();

        expect(backgammonGame.players).toEqual(generatePlayersObj(null, null));
        expect(backgammonGame._users.has(clientId)).toBeFalsy();
        expect(socket.broadcast.emit).toHaveBeenCalledWith(
            GAME_EVENTS.DISCONNECT_USER,
            mockUser.name
        );
        expect(disconnectCb).toHaveBeenCalledTimes(0);
    });

    it('should delete player from connected users list and players list.', () => {
        // register to users list
        const mockUser = {
            id: Date.now().toString(),
            name: 'Mock User',
            email: 'mock_user@example.com',
        };
        // @ts-ignore
        backgammonGame._users.set(clientId, mockUser);
        // register user as player
        backgammonGame.players[PLAYERS.BLACK] = mockUser;
        // result players
        const players = generatePlayersObj(null, null);

        // @ts-ignore
        handleDisconnect.call(backgammonGame, clientId, socket, disconnectCb)();

        expect(backgammonGame.players).toEqual(players);
        expect(backgammonGame._users.has(clientId)).toBeFalsy();
        expect(socket.broadcast.emit).toHaveBeenCalledWith(
            GAME_EVENTS.DISCONNECT_USER,
            mockUser.name
        );
        expect(backgammonGame._resetGame).toHaveBeenCalledTimes(1);
        expect(backgammonGame._resetGame).toHaveBeenCalledWith();
        expect(socket.broadcast.emit).toHaveBeenCalledWith(
            GAME_EVENTS.DISCONNECT_PLAYER,
            players
        );
        expect(socket.broadcast.emit).toHaveBeenCalledTimes(2);
        expect(disconnectCb).toHaveBeenCalledWith(backgammonGame.id);
    });
});

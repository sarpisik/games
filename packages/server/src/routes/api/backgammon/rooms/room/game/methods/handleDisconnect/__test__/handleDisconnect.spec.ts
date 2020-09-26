/* eslint-disable @typescript-eslint/ban-ts-comment */
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import handleDisconnect from '../handleDisconnect';
import { GAME_EVENTS } from '@shared-types/game';
import { PLAYERS } from '@shared-types/backgammon';

describe('handleDisconnect', () => {
    let backgammonGame: Pick<BackgammonGame, 'id' | '_users' | '_status'> & {
            _resetGame: jasmine.Spy<jasmine.Func>;
            _handlePlayerDisconnect: jasmine.Spy<jasmine.Func>;
            _setStatus: jasmine.Spy<jasmine.Func>;
            players: {
                [key in keyof BackgammonGame['players']]: {
                    id: string;
                    name: string;
                    email: string;
                } | null;
            };
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
            _handlePlayerDisconnect: jasmine.createSpy(),
            _setStatus: jasmine.createSpy('_setStatus'),
            _status: 'OVER',
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
        backgammonGame._users.set(clientId, { user: mockUser });

        // @ts-ignore
        handleDisconnect.call(backgammonGame, clientId, socket, disconnectCb)();

        expect(backgammonGame.players).toEqual(generatePlayersObj(null, null));
        expect(backgammonGame._users.has(clientId)).toBeFalsy();
        expect(socket.broadcast.emit).toHaveBeenCalledWith(
            GAME_EVENTS.DISCONNECT_USER,
            mockUser.name
        );
        expect(disconnectCb).toHaveBeenCalledTimes(1);
    });

    it('should delete player from connected users list and players list when game status is "UNINITIALIZED".', () => {
        // register to users list
        const mockUser = {
            id: Date.now().toString(),
            name: 'Mock User',
            email: 'mock_user@example.com',
        };
        // @ts-ignore
        backgammonGame._users.set(clientId, { user: mockUser });
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
        expect(backgammonGame._setStatus).toHaveBeenCalledWith(
            'UNINITIALIZED',
            backgammonGame
        );
        expect(disconnectCb).toHaveBeenCalledWith(backgammonGame.id, new Map());

        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);
        expect(socket.broadcast.emit).toHaveBeenCalledTimes(1);
    });

    it('should delete player from connected users list and players list and calls "_handlePlayerDisconnect" method when game status is "INITIALIZED".', () => {
        // Game is not over
        backgammonGame._status = 'INITIALIZED';

        // register to users list
        const [whitePlayer, blackPlayer] = [
            {
                id: 'white-player-id',
                name: 'Mock User',
                email: 'mock_user@example.com',
            },
            {
                id: 'black-player-id',
                name: 'Mock User Black',
                email: 'mock_user_black@example.com',
            },
        ];

        // @ts-ignore
        backgammonGame._users.set(clientId, { user: whitePlayer });
        backgammonGame._users.set('black-layer-client-id', {
            // @ts-ignore
            user: blackPlayer,
        });
        // register user as player
        backgammonGame.players[PLAYERS.WHITE] = whitePlayer;
        backgammonGame.players[PLAYERS.BLACK] = blackPlayer;
        // result players
        const players = generatePlayersObj(blackPlayer, null);

        // @ts-ignore
        handleDisconnect.call(backgammonGame, clientId, socket, disconnectCb)();

        expect(backgammonGame.players).toEqual(players);
        expect(backgammonGame._users.has(clientId)).toBeFalsy();

        // User disconnected events.
        expect(socket.broadcast.emit).toHaveBeenCalledWith(
            GAME_EVENTS.DISCONNECT_PLAYER,
            players
        );
        expect(backgammonGame._handlePlayerDisconnect).toHaveBeenCalledWith({
            id: whitePlayer.id,
            name: whitePlayer.name,
        });
        expect(disconnectCb).toHaveBeenCalledWith(
            backgammonGame.id,
            backgammonGame._users
        );

        expect(socket.broadcast.emit).toHaveBeenCalledTimes(2);
        expect(backgammonGame._handlePlayerDisconnect).toHaveBeenCalledTimes(1);
        expect(backgammonGame._resetGame).toHaveBeenCalledTimes(0);
    });
});

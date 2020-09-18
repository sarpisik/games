/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../../game';
import handleMessage from '../handleMessage';

describe('handleMessage', () => {
    let backgammonGame: Pick<BackgammonGame, '_users'> & {
            _emitNamespace: jasmine.Spy<jasmine.Func>;
        },
        socket: { emit: jasmine.Spy<jasmine.Func> };

    beforeEach(() => {
        backgammonGame = {
            _users: new Map(),
            _emitNamespace: jasmine.createSpy('_emitNamespace'),
        };
        socket = { emit: jasmine.createSpy('emit') };
    });

    it(`emits "${GAME_EVENTS.USER_NOT_FOUND_CHAT}" event, when users list is empty.`, () => {
        // Mock user which does not match.
        const id = '12345';
        handleMessage.call(
            // @ts-ignore
            backgammonGame,
            socket
        )({
            id,
            message: 'The message which will not shown.',
        });

        expect(socket.emit).toHaveBeenCalledTimes(1);
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);
    });

    it(`emits "${GAME_EVENTS.USER_NOT_FOUND_CHAT}" event, when user not found.`, () => {
        // Mock user which does not match.
        const id = '12345';
        backgammonGame._users.set(id, {
            // @ts-ignore
            user: { id: '54321', name: 'mock user' },
        });

        handleMessage.call(
            // @ts-ignore
            backgammonGame,
            socket
        )({
            id,
            message: 'The message which will not shown.',
        });

        expect(socket.emit).toHaveBeenCalledTimes(1);
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);
    });

    it(`emits "${GAME_EVENTS.MESSAGE}" event, when user found.`, () => {
        // Mock user which matches.
        const id = '12345';
        // @ts-ignore
        backgammonGame._users.set(id, { user: { id, name: 'mock user' } });

        handleMessage.call(
            // @ts-ignore
            backgammonGame,
            socket
        )({
            id,
            message: 'The message which will be shown.',
        });

        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
        expect(socket.emit).toHaveBeenCalledTimes(0);
    });
});

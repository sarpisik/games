/* eslint-disable @typescript-eslint/ban-ts-comment */
import { User } from '@shared-backgammon/src/types/user';
import { GAME_EVENTS } from '@shared-types/game';
import handlePlayerDisconnect, {
    createMessage,
} from '../handlePlayerDisconnect';
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import { PLAYERS } from '@shared-types/backgammon';
import { SCORES } from '../../../constants';

type Player = Exclude<
    BackgammonGame['players'][keyof BackgammonGame['players']],
    null
>;

describe('handlePlayerDisconnect', () => {
    let backgammonGame: {
            _emitNamespace: jasmine.Spy<jasmine.Func>;
            _updatePlayerScore: jasmine.Spy<jasmine.Func>;
            _handlePlayerDisconnect: (
                userId: User['id'],
                secondsLeft?: number
            ) => void;
            players: {
                [PLAYERS.BLACK]: Player;
                [PLAYERS.WHITE]: Player;
            };
            _status: BackgammonGame['_status'];
        },
        userId: User['id'];

    beforeEach(() => {
        userId = '54321';
        const players = generatePlayersObj(
            { id: userId, name: 'black-player', email: 'test@example.com' },
            { id: '12345', name: 'white-player', email: 'test@example.com' }
        );
        backgammonGame = {
            _emitNamespace: jasmine.createSpy(),
            _updatePlayerScore: jasmine.createSpy(),
            _handlePlayerDisconnect: jasmine.createSpy(),
            players,
            _status: 'INITIALIZED',
        };
    });

    it(`handles game over if the disconnected player does not exist and winner "${
        PLAYERS[PLAYERS.WHITE]
    }"`, () => {
        delete backgammonGame.players[PLAYERS.BLACK];
        const winner = PLAYERS.WHITE;
        const status = 'UNINITIALIZED';
        const winnerId = backgammonGame.players[winner].id;

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, userId);

        expect(backgammonGame._status).toBe(status);

        // Notification
        expect(
            backgammonGame._emitNamespace
        ).toHaveBeenCalledWith(GAME_EVENTS.GAME_OVER, { winner });
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

        // Calculation
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'WIN',
            winnerId,
            SCORES.WINNER
        );
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(1);
    });

    it(`handles game over if the disconnected player does not exist and winner "${
        PLAYERS[PLAYERS.BLACK]
    }"`, () => {
        userId = backgammonGame.players[PLAYERS.WHITE].id;
        delete backgammonGame.players[PLAYERS.WHITE];
        const winner = PLAYERS.BLACK;
        const status = 'UNINITIALIZED';
        const winnerId = backgammonGame.players[winner].id;

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, userId);

        expect(backgammonGame._status).toBe(status);

        // Notification
        expect(
            backgammonGame._emitNamespace
        ).toHaveBeenCalledWith(GAME_EVENTS.GAME_OVER, { winner });
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

        // Calculation
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'WIN',
            winnerId,
            SCORES.WINNER
        );
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(1);
    });

    it(`handles game over if timeout and winner "${
        PLAYERS[PLAYERS.BLACK]
    }"`, () => {
        userId = backgammonGame.players[PLAYERS.WHITE].id;
        const winner = PLAYERS.BLACK;
        const winnerId = backgammonGame.players[winner].id;
        const status = 'UNINITIALIZED';

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, userId, 0);

        expect(backgammonGame._status).toBe(status);

        // Notification
        expect(
            backgammonGame._emitNamespace
        ).toHaveBeenCalledWith(GAME_EVENTS.GAME_OVER, { winner });
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

        // Calculation
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'WIN',
            winnerId,
            SCORES.WINNER
        );
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'ESCAPE',
            userId,
            SCORES.ESCAPE
        );
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(2);
    });

    it(`logs error when both players are not found.`, () => {
        // @ts-ignore
        backgammonGame.players = generatePlayersObj(null, null);
        const status = 'UNINITIALIZED';

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, userId);

        expect(backgammonGame._status).toBe(status);

        // Notification
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);

        // Calculation
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(0);
    });

    it(`emits "${GAME_EVENTS.NOTIFICATION}" event for "${
        PLAYERS[PLAYERS.BLACK]
    }" player and calls itself after one second.`, (done) => {
        const player = backgammonGame.players[PLAYERS.BLACK];
        backgammonGame._handlePlayerDisconnect = (_userId, secondsLeft) => {
            // Notify client
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.NOTIFICATION,
                createMessage(player.name, 10)
            );
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

            // Recursion
            expect(_userId).toBe(userId);
            expect(secondsLeft).toBe(9);
            done();
        };

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, userId);
    });
});

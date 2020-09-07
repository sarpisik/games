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
import { ONE_SECOND } from '@shared-types/constants';

type Player = Exclude<
    BackgammonGame['players'][keyof BackgammonGame['players']],
    null
>;

describe('handlePlayerDisconnect', () => {
    let backgammonGame: {
        _emitNamespace: jasmine.Spy<jasmine.Func>;
        _updatePlayerScore: jasmine.Spy<jasmine.Func>;
        _handlePlayerDisconnect: (
            userId: Pick<User, 'id' | 'name'>,
            secondsLeft?: number
        ) => void;
        players: {
            [PLAYERS.BLACK]: Player;
            [PLAYERS.WHITE]: Player;
        };
        _status: BackgammonGame['_status'];
        _tRef?: BackgammonGame['_tRef'];
    };

    beforeEach(() => {
        const players = generatePlayersObj(
            { id: '54321', name: 'black-player', email: 'test@example.com' },
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

    it(`does not nothing when disconnected player connects back.`, () => {
        const disconnedtedPlayer = {
            id: backgammonGame.players[PLAYERS.BLACK].id,
            name: backgammonGame.players[PLAYERS.BLACK].name,
        };

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer);

        // Notification
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);

        // Calculation
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(0);

        // recursion
        expect(backgammonGame._handlePlayerDisconnect).toHaveBeenCalledTimes(0);
    });

    it(`clears timeout when disconnected player connects back.`, () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        backgammonGame._tRef = setTimeout(() => {}, ONE_SECOND);
        const disconnedtedPlayer = {
            id: backgammonGame.players[PLAYERS.BLACK].id,
            name: backgammonGame.players[PLAYERS.BLACK].name,
        };

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer);

        // Notification
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);

        // Calculation
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(0);

        // recursion
        expect(backgammonGame._handlePlayerDisconnect).toHaveBeenCalledTimes(0);
    });

    it(`handles game over if the disconnected player does not exist and timeout. Winner is "${
        PLAYERS[PLAYERS.WHITE]
    }" player.`, () => {
        const disconnedtedPlayer = {
            id: backgammonGame.players[PLAYERS.BLACK].id,
            name: backgammonGame.players[PLAYERS.BLACK].name,
        };
        delete backgammonGame.players[PLAYERS.BLACK];
        const winner = PLAYERS.WHITE;
        const status = 'UNINITIALIZED';
        const winnerId = backgammonGame.players[winner].id;

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer, 0);

        expect(backgammonGame._status).toBe(status);

        // Notification
        expect(
            backgammonGame._emitNamespace
        ).toHaveBeenCalledWith(GAME_EVENTS.GAME_OVER, { winner });
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

        // Win
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'WIN',
            winnerId,
            SCORES.WINNER
        );

        // Escape
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'ESCAPE',
            disconnedtedPlayer.id,
            SCORES.ESCAPE
        );

        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(2);
    });

    it(`handles game over if the disconnected player does not exist and timeout. Winner is "${
        PLAYERS[PLAYERS.BLACK]
    }" player.`, () => {
        const disconnedtedPlayer = {
            id: backgammonGame.players[PLAYERS.WHITE].id,
            name: backgammonGame.players[PLAYERS.WHITE].name,
        };
        delete backgammonGame.players[PLAYERS.WHITE];
        const winner = PLAYERS.BLACK;
        const status = 'UNINITIALIZED';
        const winnerId = backgammonGame.players[winner].id;

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer, 0);

        expect(backgammonGame._status).toBe(status);

        // Notification
        expect(
            backgammonGame._emitNamespace
        ).toHaveBeenCalledWith(GAME_EVENTS.GAME_OVER, { winner });
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

        // Win
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'WIN',
            winnerId,
            SCORES.WINNER
        );

        // Escape
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'ESCAPE',
            disconnedtedPlayer.id,
            SCORES.ESCAPE
        );

        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(2);
    });

    it(`handles game over if the disconnected player and winner player are do not exist and timeout`, () => {
        const disconnedtedPlayer = {
            id: backgammonGame.players[PLAYERS.WHITE].id,
            name: backgammonGame.players[PLAYERS.WHITE].name,
        };
        delete backgammonGame.players[PLAYERS.BLACK];
        delete backgammonGame.players[PLAYERS.WHITE];

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer, 0);

        // Notification
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);

        // Escape
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith(
            'ESCAPE',
            disconnedtedPlayer.id,
            SCORES.ESCAPE
        );

        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(1);
    });

    it(`emits "${GAME_EVENTS.NOTIFICATION}" event for "${
        PLAYERS[PLAYERS.BLACK]
    }" player and calls itself after one second.`, (done) => {
        const disconnedtedPlayer = {
            id: backgammonGame.players[PLAYERS.WHITE].id,
            name: backgammonGame.players[PLAYERS.WHITE].name,
        };

        delete backgammonGame.players[PLAYERS.WHITE];

        backgammonGame._handlePlayerDisconnect = (
            _disconnedtedPlayer,
            secondsLeft
        ) => {
            // Notify client
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.NOTIFICATION,
                createMessage(disconnedtedPlayer.name, 10)
            );
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

            // Recursion
            expect(_disconnedtedPlayer).toEqual(disconnedtedPlayer);
            expect(secondsLeft).toBe(9);
            done();
        };

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer);
    });
});

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { User } from '@shared-backgammon/src/types/user';
import { EmitGameOver, PLAYERS } from '@shared-types/backgammon';
import { ONE_SECOND } from '@shared-types/constants';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import handlePlayerDisconnect, {
    createMessage,
} from '../handlePlayerDisconnect';

type Player = Exclude<
    BackgammonGame['players'][keyof BackgammonGame['players']],
    null
>;

describe('handlePlayerDisconnect', () => {
    let backgammonGame: {
        _emitNamespace: jasmine.Spy<jasmine.Func>;
        _setStatus: jasmine.Spy<jasmine.Func>;
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

    const createUpdateParams = (
        action: string,
        playerId: string,
        _score: number
    ) => ({
        action,
        playerId,
        _score,
    });

    beforeEach(() => {
        const players = generatePlayersObj(
            { id: '54321', name: 'black-player', email: 'test@example.com' },
            { id: '12345', name: 'white-player', email: 'test@example.com' }
        );
        backgammonGame = {
            _emitNamespace: jasmine.createSpy('_emitNamespace'),
            _setStatus: jasmine.createSpy('_setStatus'),
            _handlePlayerDisconnect: jasmine.createSpy(
                '_handlePlayerDisconnect'
            ),
            players,
            _status: 'INITIALIZED',
        };
    });

    it(`does emits event when disconnected player reconnects.`, () => {
        const disconnedtedPlayer = {
            id: backgammonGame.players[PLAYERS.BLACK].id,
            name: backgammonGame.players[PLAYERS.BLACK].name,
        };

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer);

        // Notification
        expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
            GAME_EVENTS.NOTIFICATION,
            ''
        );
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

        // Calculation
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(0);

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
        const status = 'OVER';
        const payload: EmitGameOver = { winner, lose: disconnedtedPlayer.id };

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer, 0);

        // Game status
        expect(backgammonGame._setStatus).toHaveBeenCalledWith(status, payload);
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);
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
        const status = 'OVER';
        const payload: EmitGameOver = { winner, lose: disconnedtedPlayer.id };

        // @ts-ignore
        handlePlayerDisconnect.call(backgammonGame, disconnedtedPlayer, 0);

        // Game status
        expect(backgammonGame._setStatus).toHaveBeenCalledWith(status, payload);
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);
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

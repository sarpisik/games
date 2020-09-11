/* eslint-disable @typescript-eslint/ban-ts-comment */
import BackgammonGame from '../../../game';
import setStatus from '../setStatus';
import { generatePlayersObj, reduceGameProps } from '../../../helpers';
import { GAME_EVENTS } from '@shared-types/game';
import { EmitScore, PLAYERS } from '@shared-types/backgammon';

describe('setStatus', () => {
    let backgammonGame: Pick<
            BackgammonGame,
            '_status' | 'players' | '_emitGameUpdate'
        > & {
            _resetGame: jasmine.Spy<jasmine.Func>;
            _handleGameOver: jasmine.Spy<jasmine.Func>;
            _setStatus: jasmine.Spy<jasmine.Func>;
            _emitNamespace: jasmine.Spy<jasmine.Func>;
            _initializeGame: jasmine.Spy<jasmine.Func>;
        },
        _status: BackgammonGame['_status'];

    beforeEach(() => {
        _status = 'UNINITIALIZED';
        backgammonGame = {
            _status,
            _resetGame: jasmine.createSpy('_resetGame'),
            _handleGameOver: jasmine.createSpy('_handleGameOver'),
            _setStatus: jasmine.createSpy('_setStatus'),
            _emitGameUpdate: jasmine.createSpy('_emitGameUpdate'),
            _emitNamespace: jasmine.createSpy('_emitNamespace'),
            _initializeGame: jasmine.createSpy('_initializeGame'),
            players: generatePlayersObj(null, null),
        };
    });

    it('logs error when invalid status passed', () => {
        // @ts-ignore
        _status = '';

        // @ts-ignore
        setStatus.call(backgammonGame, _status);

        // New status
        expect(backgammonGame._status).toBe(_status);

        // Reducer method.
        expect(backgammonGame._setStatus).toHaveBeenCalledWith('UNINITIALIZED');
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);

        expect(backgammonGame._resetGame).toHaveBeenCalledTimes(0);
        expect(backgammonGame._emitGameUpdate).toHaveBeenCalledTimes(0);
        expect(backgammonGame._handleGameOver).toHaveBeenCalledTimes(0);
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);
        expect(backgammonGame._initializeGame).toHaveBeenCalledTimes(0);
    });

    it('reset game on status "UNINITIALIZED" with default players param', () => {
        _status = 'UNINITIALIZED';

        // @ts-ignore
        setStatus.call(backgammonGame, _status);

        // New status
        expect(backgammonGame._status).toBe(_status);

        // Reducer method.
        expect(backgammonGame._resetGame).toHaveBeenCalledWith();
        expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
            GAME_EVENTS.JOIN_GAME,
            // @ts-ignore
            reduceGameProps(backgammonGame)
        );

        expect(backgammonGame._resetGame).toHaveBeenCalledTimes(1);
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
    });

    it('reset game on status "UNINITIALIZED" with passed players param', () => {
        _status = 'UNINITIALIZED';
        const payload = { players: generatePlayersObj(null, null) };

        // @ts-ignore
        setStatus.call(backgammonGame, _status, payload);

        // New status
        expect(backgammonGame._status).toBe(_status);

        // Reducer method.
        expect(backgammonGame._resetGame).toHaveBeenCalledWith(payload.players);
        expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
            GAME_EVENTS.JOIN_GAME,
            // @ts-ignore
            reduceGameProps(backgammonGame)
        );

        expect(backgammonGame._resetGame).toHaveBeenCalledTimes(1);
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
    });

    it(`dispatch "${GAME_EVENTS.START_GAME}" event on "START" start status.`, () => {
        _status = 'START';
        backgammonGame._status = 'UNINITIALIZED';

        // @ts-ignore
        setStatus.call(backgammonGame, _status);

        expect(backgammonGame._status).toBe(_status);
        expect(backgammonGame._emitGameUpdate).toHaveBeenCalledWith(
            GAME_EVENTS.START_GAME
        );
    });

    it('set status "OVER" and calls "_handleGameOver" method with passed payload.', () => {
        _status = 'OVER';
        backgammonGame._status = 'INITIALIZED';
        const payload: EmitScore = {
            score: generatePlayersObj(0, 1),
            stages: 1,
            winner: PLAYERS.WHITE,
            rounds: [],
        };

        // @ts-ignore
        setStatus.call(backgammonGame, _status, payload);

        expect(backgammonGame._status).toBe(_status);

        expect(backgammonGame._handleGameOver).toHaveBeenCalledWith(payload);
        expect(backgammonGame._handleGameOver).toHaveBeenCalledTimes(1);
    });

    it('set status "INITIALIZED" and calls "_initializeGame" method with passed payload.', () => {
        _status = 'INITIALIZED';
        backgammonGame._status = 'START';
        const payload = PLAYERS.WHITE;

        // @ts-ignore
        setStatus.call(backgammonGame, _status, payload);

        expect(backgammonGame._status).toBe(_status);

        expect(backgammonGame._initializeGame).toHaveBeenCalledWith(payload);
        expect(backgammonGame._initializeGame).toHaveBeenCalledTimes(1);
    });
});

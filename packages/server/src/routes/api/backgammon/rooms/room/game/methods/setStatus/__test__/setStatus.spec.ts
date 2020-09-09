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
        expect(backgammonGame._resetGame).toHaveBeenCalledTimes(1);
        expect(backgammonGame._emitGameUpdate).toHaveBeenCalledTimes(0);
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
        expect(backgammonGame._resetGame).toHaveBeenCalledTimes(1);
        expect(backgammonGame._emitGameUpdate).toHaveBeenCalledTimes(0);
    });

    it(`dispatch "${GAME_EVENTS.START_GAME}" event on "${GAME_EVENTS.START_GAME}" event if players prop not full.`, (done) => {
        _status = 'START';
        const payload = { players: generatePlayersObj({ id: '12345' }, null) };
        const result = reduceGameProps(
            // @ts-ignore
            Object.assign({}, backgammonGame, { _status }, payload)
        );

        backgammonGame._status = 'UNINITIALIZED';
        backgammonGame._emitGameUpdate = function (event: string) {
            // New status
            expect(backgammonGame._status).toBe(_status);

            // Dispatch game event
            expect(event).toBe(GAME_EVENTS.START_GAME);
            // Ignore missing props for result obj.
            // @ts-ignore
            expect(reduceGameProps(this)).toEqual(result);
            done();
        };

        // @ts-ignore
        setStatus.call(backgammonGame, _status, payload);
    });

    it(`set status "INITIALIZED" on "${GAME_EVENTS.START_GAME}" event if players prop is full.`, () => {
        _status = 'INITIALIZED';
        // Ignore missing props for players obj.
        // @ts-ignore
        backgammonGame.players = generatePlayersObj({ id: '12345' }, null);
        // One of the players already clicked on start game button
        // so status is "START"
        backgammonGame._status = 'START';
        const payload = {
            players: generatePlayersObj({ id: '12345' }, { id: '54321' }),
        };

        // @ts-ignore
        setStatus.call(backgammonGame, backgammonGame._status, payload);

        expect(backgammonGame._setStatus).toHaveBeenCalledWith(_status);
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);
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

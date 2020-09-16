import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../../game';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import handleSurrender from '../handleSurrender';

describe('handleSurrender', () => {
    let data: Parameters<typeof handleSurrender>[0],
        backgammonGame: Pick<BackgammonGame, '_status' | '_handleTimer'> & {
            _emitNamespace: jasmine.Spy<jasmine.Func>;
        };

    beforeEach(() => {
        data = { type: 'REQUEST', payload: { id: '12345' } };
        backgammonGame = {
            _status: 'SURRENDER',
            _emitNamespace: jasmine.createSpy('_emitNamespace'),
            _handleTimer: jasmine.createSpy('_handleTimer'),
        };
    });

    it(`emits "${GAME_EVENTS.SURRENDER}" event when client requested to surrender.`, () => {
        // @ts-ignore
        handleSurrender.call(backgammonGame, data);

        expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
            'SURRENDER',
            data
        );
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
    });

    it(`emits "${GAME_EVENTS.SURRENDER}" event and continue playing when client rejected to surrender.`, (done) => {
        data.type = 'REJECT';
        data.payload.id = '54321'; // ID of the rejected player.
        backgammonGame._handleTimer = async () => {
            expect(backgammonGame._status).toBe('INITIALIZED');

            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                'SURRENDER',
                data
            );

            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            done();
        };

        // @ts-ignore
        handleSurrender.call(backgammonGame, data);
    });
});

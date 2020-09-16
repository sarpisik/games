import { GAME_EVENTS } from '@shared-types/game';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import handleSurrender from '../handleSurrender';

describe('handleSurrender', () => {
    let data: Parameters<typeof handleSurrender>[0],
        backgammonGame: { _emitNamespace: jasmine.Spy<jasmine.Func> };

    beforeEach(() => {
        data = { type: 'REQUEST', payload: { id: '12345' } };
        backgammonGame = {
            _emitNamespace: jasmine.createSpy('_emitNamespace'),
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
});

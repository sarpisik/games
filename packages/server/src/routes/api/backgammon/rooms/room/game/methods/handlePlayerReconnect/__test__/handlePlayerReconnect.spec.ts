/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GAME_EVENTS } from '@shared-types/game';
import handlePlayerReconnect from '../handlePlayerReconnect';

describe('handlePlayerReconnect', () => {
    it(`emits "${GAME_EVENTS.JOIN_GAME}" event and calls the "_handleTimer" method to activate the timer.`, () => {
        const backgammonGame = {
            _emitNamespace: jasmine.createSpy('_emitNamespace'),
            _emitGameUpdate: jasmine.createSpy('_emitGameUpdate'),
            _handleTimer: jasmine.createSpy('_handleTimer'),
        };

        // @ts-ignore
        handlePlayerReconnect.call(backgammonGame);

        expect(backgammonGame._emitGameUpdate).toHaveBeenCalledWith(
            GAME_EVENTS.JOIN_GAME
        );
        expect(backgammonGame._emitGameUpdate).toHaveBeenCalledTimes(1);

        expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
            GAME_EVENTS.NOTIFICATION,
            ''
        );
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);

        expect(backgammonGame._handleTimer).toHaveBeenCalledWith();
        expect(backgammonGame._handleTimer).toHaveBeenCalledTimes(1);
    });
});

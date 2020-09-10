/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GAME_EVENTS } from '@shared-types/game';
import handlePlayerReconnect from '../handlePlayerReconnect';

describe('handlePlayerReconnect', () => {
    it(`emits "${GAME_EVENTS.JOIN_GAME}" event and calls the "_handleTimer" method to activate the timer.`, () => {
        const backgammonGame = {
            _emitGameUpdate: jasmine.createSpy('_emitGameUpdate'),
            _handleTimer: jasmine.createSpy('_handleTimer'),
        };

        // @ts-ignore
        handlePlayerReconnect.call(backgammonGame);

        expect(backgammonGame._emitGameUpdate).toHaveBeenCalledWith(
            GAME_EVENTS.JOIN_GAME
        );
        expect(backgammonGame._emitGameUpdate).toHaveBeenCalledTimes(1);

        expect(backgammonGame._handleTimer).toHaveBeenCalledWith();
        expect(backgammonGame._handleTimer).toHaveBeenCalledTimes(1);
    });
});

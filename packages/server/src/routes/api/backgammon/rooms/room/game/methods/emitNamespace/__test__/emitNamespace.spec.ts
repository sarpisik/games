/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GAME_EVENTS } from '@shared-types/game';
import emitNamespace from '../emitNamespace';

const { ROUND, SKIP_ROUND } = GAME_EVENTS;

describe('emitNamespace', () => {
    it('should emit passed event within payload', () => {
        const emit = jasmine.createSpy();
        const backgammonGame = { _namespace: { emit } };
        const payload = 'mock_payload';

        // @ts-ignore
        emitNamespace.call(backgammonGame, SKIP_ROUND, payload);

        expect(emit).toHaveBeenCalledTimes(1);
        expect(emit).toHaveBeenCalledWith(SKIP_ROUND, payload);
    });

    it(`should emit passed event within payload and calls timer handler when passed event is "${ROUND}"`, () => {
        const emit = jasmine.createSpy();
        const _handleTimer = jasmine.createSpy();
        const backgammonGame = { _namespace: { emit }, _handleTimer };
        const payload = 'mock_payload';

        // @ts-ignore
        emitNamespace.call(backgammonGame, ROUND, payload);

        expect(emit).toHaveBeenCalledTimes(1);
        expect(emit).toHaveBeenCalledWith(ROUND, payload);

        expect(_handleTimer).toHaveBeenCalledTimes(1);
        expect(_handleTimer).toHaveBeenCalledWith();
    });
});

/* eslint-disable @typescript-eslint/ban-ts-comment */
import onSurrender from '../onSurrender';

describe('onSurrender', () => {
    let data: Parameters<typeof onSurrender>[0],
        backgammonGame: { _setStatus: jasmine.Spy<jasmine.Func> };

    beforeEach(() => {
        data = { type: 'REQUEST', payload: { id: '12345' } };
        backgammonGame = { _setStatus: jasmine.createSpy() };
    });

    it('sets status when client requested to surrender.', () => {
        // @ts-ignore
        onSurrender.call(backgammonGame, data);

        expect(backgammonGame._setStatus).toHaveBeenCalledWith(
            'SURRENDER',
            data
        );
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);
    });
});

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmitBase, PLAYERS } from '@shared-types/backgammon';
import BackgammonGame from '../../../game';
import withBreakTimer from '../withBreakTimer';

describe('withBreakTimer', () => {
    let backgammonGame: Pick<BackgammonGame, '_tRef' | '_t'>,
        eventHandler: jasmine.Spy<jasmine.Func>,
        data: EmitBase;

    beforeEach(() => {
        backgammonGame = { _tRef: undefined, _t: PLAYERS.BLACK };
        eventHandler = jasmine.createSpy();
        data = { gameId: 12345 };
    });

    it('should delete time player and call passed callback', (done) => {
        withBreakTimer
            .call(
                // @ts-ignore
                backgammonGame,
                eventHandler
            )(data)
            .then(() => {
                expect(backgammonGame._t).toBeFalsy();
                expect(eventHandler).toHaveBeenCalledWith(data);
                done();
            });
    });

    it('should delete timeout ref with time player and call passed callback', (done) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        backgammonGame._tRef = setTimeout(() => {}, 0);
        withBreakTimer
            .call(
                // @ts-ignore
                backgammonGame,
                eventHandler
            )(data)
            .then(() => {
                expect(backgammonGame._t).toBeFalsy();
                // @ts-ignore
                expect(backgammonGame._tRef._destroyed).toBeTrue();
                expect(eventHandler).toHaveBeenCalledWith(data);
                done();
            });
    });
});

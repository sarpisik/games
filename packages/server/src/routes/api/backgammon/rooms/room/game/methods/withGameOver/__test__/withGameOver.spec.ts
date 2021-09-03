/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmitBase } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../../game';
import withGameOver from '../withGameOver';

describe('withGameOver', () => {
    let backgammonGame: Pick<BackgammonGame, '_status'>,
        socket: { emit: jasmine.Spy<jasmine.Func> },
        eventHandler: jasmine.Spy<jasmine.Func>,
        data: EmitBase;

    beforeEach(() => {
        backgammonGame = { _status: 'INITIALIZED' };
        socket = { emit: jasmine.createSpy('emit') };
        eventHandler = jasmine.createSpy('eventHandler');
        data = { gameId: 12345 };
    });

    it('should call passed event handler', (done) => {
        withGameOver
            .call(
                // @ts-ignore
                backgammonGame,
                socket,
                eventHandler
            )(data)
            .then(() => {
                expect(eventHandler).toHaveBeenCalledWith(data);
                done();
            });
    });

    it(`should invoke event emitter when game status is "OVER"`, (done) => {
        backgammonGame._status = 'OVER';

        withGameOver
            .call(
                // @ts-ignore
                backgammonGame,
                socket,
                eventHandler
            )(data)
            .then(() => {
                expect(socket.emit).toHaveBeenCalledWith(
                    GAME_EVENTS.ACTION_AFTER_OVER
                );
                expect(socket.emit).toHaveBeenCalledTimes(1);
                expect(eventHandler).toHaveBeenCalledTimes(0);
                done();
            });
    });
});

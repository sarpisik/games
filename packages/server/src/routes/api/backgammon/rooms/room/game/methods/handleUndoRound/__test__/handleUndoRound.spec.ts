import { GAME_EVENTS } from '@shared-types/game';
import handleUndoRound from '../handleUndoRound';

describe('handleUndoRound', () => {
    it('should call undo round event', (done) => {
        const _undoRound = jasmine.createSpy().and.resolveTo();
        const _emitNamespace = jasmine.createSpy();
        const backgammonGame = { _undoRound, _emitNamespace, rounds: [] };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleUndoRound.call(backgammonGame).then(() => {
            expect(backgammonGame._undoRound).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.UNDO_ROUND,
                backgammonGame.rounds
            );
            done();
        });
    });
});

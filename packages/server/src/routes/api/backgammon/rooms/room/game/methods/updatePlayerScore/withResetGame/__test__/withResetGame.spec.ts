import { SCORES } from '../../../../constants';
import withResetGame from '../withResetGame';

describe('withResetGame', () => {
    it('calls "_resetGame" method and returns wrapped function within passed params', () => {
        const _resetGame = jasmine.createSpy();
        const backgammonGame: any = { _resetGame };
        const wrappedFunction = jasmine.createSpy();
        const params = {
            action: 'WIN',
            playerId: '12345',
            _score: SCORES.WINNER,
        } as const;

        withResetGame(wrappedFunction).call(backgammonGame, params);

        expect(_resetGame).toHaveBeenCalledWith();
        expect(_resetGame).toHaveBeenCalledTimes(1);

        expect(wrappedFunction).toHaveBeenCalledWith(params);
        expect(wrappedFunction).toHaveBeenCalledTimes(1);
    });
});

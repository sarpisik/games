import { PLAYERS } from '@shared-types/backgammon';
import initializeGame from '../initializeGame';

describe('initializeGame', () => {
    it(`should call round initializer method with passed "${
        PLAYERS[PLAYERS.WHITE]
    }" player after setting the game status and the rounds`, () => {
        const backgammonGame = {
            _status: '',
            _initializeRound: jasmine.createSpy(),
            _setStatus: jasmine.createSpy(),
        };
        const roundPlayer = PLAYERS.WHITE;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        initializeGame.call(backgammonGame, roundPlayer);

        expect(backgammonGame._setStatus).toHaveBeenCalledWith('INITIALIZED');
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);
        expect(backgammonGame._initializeRound).toHaveBeenCalledWith(
            roundPlayer
        );
        expect(backgammonGame._initializeRound).toHaveBeenCalledTimes(1);
    });
});

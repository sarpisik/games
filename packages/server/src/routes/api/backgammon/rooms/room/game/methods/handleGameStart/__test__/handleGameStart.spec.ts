/* eslint-disable @typescript-eslint/ban-ts-comment */
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import handleGameStart from '../handleGameStart';
import { PLAYERS } from '@shared-types/backgammon';

describe('handleGameStart', () => {
    let backgammonGame: Pick<BackgammonGame, '_status'> & {
        players: ReturnType<typeof generatePlayersObj>;
        _handlePlayerReconnect: jasmine.Spy<jasmine.Func>;
        _setStatus: jasmine.Spy<jasmine.Func>;
    };

    beforeEach(() => {
        backgammonGame = {
            players: generatePlayersObj({ id: '12345' }, null),
            _status: 'INITIALIZED',
            _handlePlayerReconnect: jasmine.createSpy('_handlePlayerReconnect'),
            _setStatus: jasmine.createSpy('_setStatus'),
        };
    });

    it('calls "_handlePlayerReconnect" method when players are full and the game status is "INITIALIZED"', () => {
        const payload = Object.assign({}, backgammonGame.players, {
            [PLAYERS.WHITE]: { id: '54321' },
        });
        const result = generatePlayersObj({ id: '12345' }, { id: '54321' });

        // @ts-ignore
        handleGameStart.call(backgammonGame, payload);

        expect(backgammonGame.players).toEqual(result);

        // Called methods
        expect(backgammonGame._handlePlayerReconnect).toHaveBeenCalledWith();
        expect(backgammonGame._handlePlayerReconnect).toHaveBeenCalledTimes(1);

        // Un called methods
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(0);
    });

    it('calls "_setStatus" method when players are full and the game status is "START"', () => {
        const payload = Object.assign({}, backgammonGame.players, {
            [PLAYERS.WHITE]: { id: '54321' },
        });
        const result = generatePlayersObj({ id: '12345' }, { id: '54321' });
        backgammonGame._status = 'START';

        // @ts-ignore
        handleGameStart.call(backgammonGame, payload);

        expect(backgammonGame.players).toEqual(result);

        // Called methods
        expect(backgammonGame._setStatus).toHaveBeenCalledWith('INITIALIZED');
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);

        // Un called methods
        expect(backgammonGame._handlePlayerReconnect).toHaveBeenCalledTimes(0);
    });

    it('calls "_setStatus" method when players are not full.', () => {
        const result = generatePlayersObj(null, { id: '54321' });
        backgammonGame.players[PLAYERS.BLACK] = null;

        // @ts-ignore
        handleGameStart.call(backgammonGame, result);

        expect(backgammonGame.players).toEqual(result);

        // Called methods
        expect(backgammonGame._setStatus).toHaveBeenCalledWith('START');
        expect(backgammonGame._setStatus).toHaveBeenCalledTimes(1);

        // Un called methods
        expect(backgammonGame._handlePlayerReconnect).toHaveBeenCalledTimes(0);
    });
});

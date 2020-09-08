import { EmitStageOver, PLAYERS } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import handleGameOver from '../handleGameOver';

describe('handleGameOver', () => {
    const STATUS = 'OVER';

    it(`should set status to "${STATUS}" and emits "${GAME_EVENTS.GAME_OVER}" event`, () => {
        const _emitNamespace = jasmine.createSpy();
        const _handlePlayersScore = jasmine.createSpy();
        const _setStatus = jasmine.createSpy();
        const backgammonGame = {
            _status: '',
            _handlePlayersScore,
            _setStatus,
            _emitNamespace,
        };
        const payload: EmitStageOver = { winner: PLAYERS.BLACK };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleGameOver.call(backgammonGame, payload);

        expect(_setStatus).toHaveBeenCalledTimes(1);
        expect(_setStatus).toHaveBeenCalledWith('OVER');

        expect(_handlePlayersScore).toHaveBeenCalledTimes(1);
        expect(_handlePlayersScore).toHaveBeenCalledWith(payload.winner);

        expect(_emitNamespace).toHaveBeenCalledTimes(1);
        expect(_emitNamespace).toHaveBeenCalledWith(
            GAME_EVENTS.GAME_OVER,
            payload
        );
    });
});

import { EmitStageOver, PLAYERS } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import handleGameOver from '../handleGameOver';

describe('handleGameOver', () => {
    const STATUS = 'OVER';

    it(`should set status to "${STATUS}" and emits "${GAME_EVENTS.GAME_OVER}" event`, () => {
        const _emitNamespace = jasmine.createSpy();
        const _handlePlayersScore = jasmine.createSpy();
        const backgammonGame = {
            _status: '',
            _handlePlayersScore,
            _emitNamespace,
        };
        const payload: EmitStageOver = { winner: PLAYERS.BLACK };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleGameOver.call(backgammonGame, payload);

        expect(_handlePlayersScore).toHaveBeenCalledTimes(1);
        expect(_handlePlayersScore).toHaveBeenCalledWith(payload);

        expect(_emitNamespace).toHaveBeenCalledTimes(1);
        expect(_emitNamespace).toHaveBeenCalledWith(
            GAME_EVENTS.GAME_OVER,
            payload
        );
    });
});

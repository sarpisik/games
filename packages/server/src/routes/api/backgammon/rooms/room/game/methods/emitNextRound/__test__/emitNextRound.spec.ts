import { GAME_EVENTS } from '@shared-types/game';
import emitNextRound from '../emitNextRound';
import { Round } from '../../../round';
import { PLAYERS } from '@shared-types/backgammon';
import { generatePlayersObj } from '../../../helpers';
import { layout } from '../../../constants';

const { ROUND } = GAME_EVENTS;

describe('emitNextRound', () => {
    it(`should register the passed round and emits "${ROUND}" event.`, () => {
        const _emitNamespace = jasmine.createSpy();
        const backgammonGame = { rounds: [], _emitNamespace };
        const round = new Round(
            1,
            1,
            PLAYERS.WHITE,
            generatePlayersObj(0, 0),
            generatePlayersObj(0, 0),
            layout
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        emitNextRound.call(backgammonGame, round);

        expect(_emitNamespace).toHaveBeenCalledTimes(1);
        expect(_emitNamespace).toHaveBeenCalledWith(ROUND, round);
    });
});

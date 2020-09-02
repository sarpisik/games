/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PLAYERS } from '@shared-types/backgammon';
import { layout } from '../../../constants';
import { generatePlayersObj } from '../../../helpers';
import { Round } from '../../../round';
import handleTimer from '../handleTimer';

describe('handleTimer', () => {
    it("should current round's player as time player", (done) => {
        const playersObj = generatePlayersObj(0, 0);
        const round = new Round(
            1,
            1,
            PLAYERS.WHITE,
            playersObj,
            playersObj,
            layout
        );
        const _recursivelySetShortTimer = jasmine.createSpy();
        const backgammonGame = {
            rounds: [round],
            _t: null,
            _recursivelySetShortTimer,
        };

        // @ts-ignore
        handleTimer.call(backgammonGame);

        // @ts-ignore
        expect(backgammonGame._t).toBe(round.player);
        expect(_recursivelySetShortTimer).toHaveBeenCalledTimes(1);
        expect(_recursivelySetShortTimer).toHaveBeenCalledWith(round.player);
        done();
    });
});

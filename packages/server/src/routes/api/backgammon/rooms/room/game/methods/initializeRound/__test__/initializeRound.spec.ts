import { PLAYERS } from '@shared-types/backgammon';
import { layout } from '../../../constants';
import { generatePlayersObj } from '../../../helpers';
import { Round } from '../../../round';
import initializeRound from '../initializeRound';

describe('initializeRound', () => {
    it('should initialize the round and call round emiter method with it. ', (done) => {
        const roundPlayer = PLAYERS.WHITE;
        const brokens = generatePlayersObj(0, 0);
        const collected = generatePlayersObj(0, 0);
        const backgammonGame = {
            _emitNextRound: (_round: Round) => {
                expect(_round.brokens).toEqual(brokens);
                expect(_round.collected).toEqual(collected);
                expect(_round.layout).toEqual(layout);
                expect(_round.player).toBe(roundPlayer);
                done();
            },
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        initializeRound.call(backgammonGame, roundPlayer);
    });
});

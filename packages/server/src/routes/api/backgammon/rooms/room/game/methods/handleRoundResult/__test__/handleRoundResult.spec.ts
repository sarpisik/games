/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Round } from '../../../round';
import generateBrokens from 'spec/support/generateBrokens';
import { layout } from '../../../constants';
import { PLAYERS } from '@shared-types/backgammon';
import handleRoundResult from '../handleRoundResult';

describe('handleRoundResult', () => {
    let backgammonGame: { _handleNextRound(round: Round): Promise<void> },
        result: Pick<Round, 'brokens' | 'dice' | 'layout'> & {
            collected?: Round['collected'];
        },
        round: Pick<Round, 'player' | 'collected' | 'turn'>;

    beforeEach(() => {
        const collected = generateBrokens(0, 0);
        result = {
            dice: [5],
            brokens: generateBrokens(0, 0),
            layout,
            collected,
        };
        round = { player: PLAYERS.BLACK, collected, turn: 1 };
    });

    it('should create new round with same round player and call the method', (done) => {
        backgammonGame = {
            async _handleNextRound(_round) {
                expect(_round.turn).toBe(round.turn + 1);
                expect(_round.player).toBe(round.player);
                expect(_round.layout).toEqual(result.layout);
                expect(_round.brokens).toEqual(result.brokens);
                expect(_round.dice).toEqual(result.dice);
                expect(_round.collected).toEqual(round.collected);
                done();
            },
        };

        // @ts-ignore
        handleRoundResult.call(backgammonGame, result, round);
    });

    it('should create new round with opponent player and call the method', (done) => {
        result.dice = [];
        delete result.collected;

        backgammonGame = {
            async _handleNextRound(_round) {
                expect(_round.turn).toBe(round.turn + 1);
                expect(_round.player).toBe(PLAYERS.WHITE);
                expect(_round.layout).toEqual(result.layout);
                expect(_round.brokens).toEqual(result.brokens);
                expect(_round.collected).toEqual(round.collected);
                done();
            },
        };

        // @ts-ignore
        handleRoundResult.call(backgammonGame, result, round);
    });
});

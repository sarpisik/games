import { layout } from '@routes/api/backgammon/games/constants';
import { PLAYERS, Round } from '@shared-types/backgammon';
import generateBrokens from 'spec/support/generateBrokens';
import { shouldSkipRound } from '../collectPoint';
import { createEvent } from './support';

describe('shouldSkipRound', () => {
    let round: Round;

    beforeEach(() => {
        const playersIndex = generateBrokens(0, 0);
        round = {
            id: Date.now(),
            attempt: 1,
            turn: 1,
            player: PLAYERS.WHITE,
            brokens: playersIndex,
            collected: playersIndex,
            layout,
            dice: [4, 6],
        };
    });

    it('should return true', () => {
        const event = createEvent(round);

        expect(shouldSkipRound(event)).toBeTrue();
    });

    it('should return false', () => {
        expect(shouldSkipRound(round)).toBeFalse();
    });
});

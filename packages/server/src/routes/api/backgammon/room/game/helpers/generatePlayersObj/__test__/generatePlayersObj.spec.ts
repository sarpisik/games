import { PLAYERS } from '@shared-types/backgammon';
import generatePlayersObj from '../generatePlayersObj';

describe('generatePlayersObj', () => {
    it('should return object with key of player indexes and passed value for each.', () => {
        const playersObj = { [PLAYERS.BLACK]: 0, [PLAYERS.WHITE]: 0 };

        expect(generatePlayersObj(0, 0)).toEqual(playersObj);
    });
});

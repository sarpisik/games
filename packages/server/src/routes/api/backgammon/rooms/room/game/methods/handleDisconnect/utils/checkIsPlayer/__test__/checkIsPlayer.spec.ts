/* eslint-disable @typescript-eslint/ban-ts-comment */
import checkIsPlayer from '../checkIsPlayer';
import { PLAYERS } from '@shared-types/backgammon';
import { generatePlayersObj } from '../../../../../helpers';

type UserId = Parameters<typeof checkIsPlayer>[0];
type Players = Parameters<typeof checkIsPlayer>[1];

describe('checkIsPlayer', () => {
    let userId: UserId, players: Players;

    beforeEach(() => {
        userId = '12345';
        players = generatePlayersObj(null, null);
    });

    it('should return false when players are not registered', () => {
        expect(checkIsPlayer(userId, players)).toBeFalse();
    });

    it(`should return true when the user is "${
        PLAYERS[PLAYERS.BLACK]
    }" player.`, () => {
        // skip the rest user properties
        // @ts-ignore
        players[PLAYERS.BLACK] = { id: userId };
        expect(checkIsPlayer(userId, players)).toBeTrue();
    });

    it(`should return true when the user is "${
        PLAYERS[PLAYERS.WHITE]
    }" player.`, () => {
        // skip the rest user properties
        // @ts-ignore
        players[PLAYERS.WHITE] = { id: userId };
        expect(checkIsPlayer(userId, players)).toBeTrue();
    });
});

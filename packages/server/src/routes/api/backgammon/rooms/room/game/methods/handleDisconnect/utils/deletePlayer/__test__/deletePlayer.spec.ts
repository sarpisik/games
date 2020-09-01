/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PLAYERS } from '@shared-types/backgammon';
import { generatePlayersObj } from '../../../../../helpers';
import deletePlayer from '../deletePlayer';

type UserId = Parameters<typeof deletePlayer>[0];
type Players = Parameters<typeof deletePlayer>[1];

describe('deletePlayer', () => {
    let userId: UserId, players: Players;

    beforeEach(() => {
        userId = '12345';
        players = generatePlayersObj(null, null);
    });

    it('should not edit any player key', () => {
        deletePlayer(userId, players);
        expect(players).toEqual(generatePlayersObj(null, null));
    });

    it(`should delete "${PLAYERS[PLAYERS.BLACK]}" player.`, () => {
        // skip the rest user properties
        // @ts-ignore
        players[PLAYERS.BLACK] = { id: userId };
        deletePlayer(userId, players);
        expect(players[PLAYERS.BLACK]).toBeFalsy();
    });

    it(`should delete "${PLAYERS[PLAYERS.WHITE]}" player.`, () => {
        // skip the rest user properties
        // @ts-ignore
        players[PLAYERS.WHITE] = { id: userId };
        deletePlayer(userId, players);
        expect(players[PLAYERS.WHITE]).toBeFalsy();
    });
});

import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { PLAYERS } from '@shared-types/backgammon';
import { generateDoubledDice } from 'spec/support/generateDoubleDice';
import getValidTrianglesOnDoubleDice from '../getValidTrianglesOnDoubleDice';

describe('getValidTrianglesOnDoubleDice', () => {
    it('should return an empty list of available triangles', (done) => {
        const triangles = layout;
        const possibleDices = [-1]; // triangle is unavailablž
        const player = PLAYERS.WHITE;

        getValidTrianglesOnDoubleDice(triangles, possibleDices, player).then(
            (result) => {
                expect(result).toEqual([]);
                done();
            }
        );
    });

    it('should return an empty list of available triangles when blocked', (done) => {
        const triangles = layout;
        const possibleDices = generateDoubledDice(5);
        const player = PLAYERS.WHITE;

        getValidTrianglesOnDoubleDice(triangles, possibleDices, player).then(
            (result) => {
                expect(result).toEqual([]);
                done();
            }
        );
    });

    it('should return a list of available triangles', (done) => {
        const triangles = layout;
        const possibleDices = generateDoubledDice(2);
        const player = PLAYERS.WHITE;

        getValidTrianglesOnDoubleDice(triangles, possibleDices, player).then(
            (result) => {
                expect(result).toEqual(possibleDices);
                done();
            }
        );
    });
});

import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { PLAYERS } from '@shared-types/backgammon';
import getValidTriangleIndexes from '../getValidTriangleIndexes';

describe('getValidTriangleIndexes', () => {
    it('should return list of available triangles', (done) => {
        const triangles = layout;
        const possibleIndexes = [-1, 5, 6]; // -1 is for testing when there is no triangle.
        const player = PLAYERS.WHITE;

        getValidTriangleIndexes(triangles, possibleIndexes, player).then(
            (result) => {
                expect(result).toEqual([6]);
                done();
            }
        );
    });

    it('should return an empty list of available triangles', (done) => {
        const triangles = layout;
        const possibleIndexes = [5, 7];
        const player = PLAYERS.WHITE;

        getValidTriangleIndexes(triangles, possibleIndexes, player).then(
            (result) => {
                expect(result).toEqual([]);
                done();
            }
        );
    });
});

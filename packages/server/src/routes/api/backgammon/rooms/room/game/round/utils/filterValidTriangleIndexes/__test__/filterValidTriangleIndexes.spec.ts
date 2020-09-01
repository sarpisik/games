import { PLAYERS } from '@shared-types/backgammon';
import { generateDoubledDice } from 'spec/support/generateDoubleDice';
import { generateValidDices } from 'spec/support/generateValidDices';
import { layout } from '../../../../constants';
import filterValidTriangleIndexes from '../filterValidTriangleIndexes';

describe('filterValidTriangleIndexes', () => {
    describe(`"${PLAYERS[PLAYERS.WHITE]}" player`, () => {
        it('should return list of valid triangles when doubled dice', (done) => {
            const validDice = generateDoubledDice(3);
            const isDouble = true;
            const startIndex = 19;
            const player = PLAYERS.WHITE;
            const triangles = layout;

            filterValidTriangleIndexes(
                validDice,
                isDouble,
                startIndex,
                player,
                triangles
            ).then((result) => {
                expect(result).toEqual([22]);
                done();
            });
        });

        it('should return list of valid triangles when undoubled dice', (done) => {
            const validDice = generateValidDices(2, 3);
            const isDouble = false;
            const startIndex = 19;
            const player = PLAYERS.WHITE;
            const triangles = layout;

            filterValidTriangleIndexes(
                validDice,
                isDouble,
                startIndex,
                player,
                triangles
            ).then((result) => {
                expect(result).toEqual([21, 22]);
                done();
            });
        });

        it('should return list of valid triangles when undoubled dice and blocked', (done) => {
            const validDice = generateValidDices(2, 4);
            const isDouble = false;
            const startIndex = 19;
            const player = PLAYERS.WHITE;
            const triangles = layout;

            filterValidTriangleIndexes(
                validDice,
                isDouble,
                startIndex,
                player,
                triangles
            ).then((result) => {
                expect(result).toEqual([21]);
                done();
            });
        });
    });

    describe(`"${PLAYERS[PLAYERS.BLACK]}" player`, () => {
        it('should return list of valid triangles when doubled dice', (done) => {
            const validDice = generateDoubledDice(3);
            const isDouble = true;
            const startIndex = 4;
            const player = PLAYERS.BLACK;
            const triangles = layout;

            filterValidTriangleIndexes(
                validDice,
                isDouble,
                startIndex,
                player,
                triangles
            ).then((result) => {
                expect(result).toEqual([1]);
                done();
            });
        });

        it('should return list of valid triangles when undoubled dice', (done) => {
            const validDice = generateValidDices(2, 3);
            const isDouble = false;
            const startIndex = 4;
            const player = PLAYERS.BLACK;
            const triangles = layout;

            filterValidTriangleIndexes(
                validDice,
                isDouble,
                startIndex,
                player,
                triangles
            ).then((result) => {
                expect(result).toEqual([2, 1]);
                done();
            });
        });

        it('should return list of valid triangles when undoubled dice and blocked', (done) => {
            const validDice = generateValidDices(3, 4);
            const isDouble = false;
            const startIndex = 4;
            const player = PLAYERS.BLACK;
            const triangles = layout;

            filterValidTriangleIndexes(
                validDice,
                isDouble,
                startIndex,
                player,
                triangles
            ).then((result) => {
                expect(result).toEqual([1]);
                done();
            });
        });
    });
});

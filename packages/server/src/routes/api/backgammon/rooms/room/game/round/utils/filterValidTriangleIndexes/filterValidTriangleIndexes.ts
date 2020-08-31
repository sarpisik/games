import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromiseMap } from '@shared/customPromise';
import {
    getValidTriangleIndexes,
    getValidTrianglesOnDoubleDice,
} from './utils';

const DIRECTIONS_MAP = {
    [PLAYERS.WHITE]: (startIndex: number) => (dice: number) =>
        startIndex + dice,
    [PLAYERS.BLACK]: (startIndex: number) => (dice: number) =>
        startIndex - dice,
};

export default async function filterValidTriangleIndexes(
    validDice: number[],
    isDouble: boolean,
    startIndex: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    triangles: Round['layout']
) {
    const calculateDirectionFrom = DIRECTIONS_MAP[player];
    const calculatePossibleIndexes = calculateDirectionFrom(startIndex);
    const possibleTriangleIndexes = await customPromiseMap(
        validDice,
        calculatePossibleIndexes
    );
    const promise = isDouble
        ? getValidTrianglesOnDoubleDice(
              triangles,
              possibleTriangleIndexes,
              player
          )
        : getValidTriangleIndexes(triangles, possibleTriangleIndexes, player);

    return promise;
}

import { PLAYERS, Round } from 'types/lib/backgammon';

interface Params {
    isDouble: boolean;
    collect: boolean;
    validDices: number[];
    startIndex: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    triangles: Round['layout'];
}

const DIRECTIONS_MAP = {
    [PLAYERS.WHITE]: (startIndex: number) => (dice: number) =>
        startIndex + dice,
    [PLAYERS.BLACK]: (startIndex: number) => (dice: number) =>
        startIndex - dice,
};

export default function filterValidTriangleIndexes(params: Params) {
    const {
        isDouble,
        collect,
        validDices,
        startIndex,
        player,
        triangles,
    } = params;
    const calculateDirectionFrom = DIRECTIONS_MAP[player];
    const calculatePossibleIndexes = calculateDirectionFrom(startIndex);
    const possibleTriangleIndexes = validDices.map(calculatePossibleIndexes);
    const validTriangleIndexes = isDouble
        ? getValidTrianglesOnDoubledDice(
              triangles,
              possibleTriangleIndexes,
              player,
              collect
          )
        : getValidTriangles(
              triangles,
              possibleTriangleIndexes,
              player,
              collect
          );

    return validTriangleIndexes;
}

function getValidTrianglesOnDoubledDice(
    triangles: Params['triangles'],
    tIndexes: number[],
    player: Params['player'],
    collect: boolean
) {
    let validTriangles: number[] = [];

    for (const tIndex of tIndexes) {
        const triangle = triangles[tIndex];

        if (!collect && !triangle) break;

        if (triangle && triangleIsBlocked(player, triangle)) break;

        validTriangles.push(tIndex);
    }

    return validTriangles;
}

function getValidTriangles(
    triangles: Params['triangles'],
    tIndexes: number[],
    player: Params['player'],
    collect: boolean
) {
    let validTriangles: number[] = [];
    const limit = tIndexes.length;

    for (let i = 0; i < limit; i++) {
        const tIndex = tIndexes[i];
        const triangle = triangles[tIndex];

        if (!collect && !triangle) continue;

        if (triangle && triangleIsBlocked(player, triangle)) {
            const isOver = i - validTriangles.length > 1;

            if (isOver) break;

            continue;
        }

        validTriangles.push(tIndex);
    }

    return validTriangles;
}

function triangleIsBlocked(
    player: Params['player'],
    triangle: Params['triangles'][number]
) {
    const [owner, points] = triangle;
    const isTaken = owner !== 0;
    const isOpponent = isTaken && owner !== player;
    const isBlocked = isOpponent && points > 1;

    return isBlocked;
}

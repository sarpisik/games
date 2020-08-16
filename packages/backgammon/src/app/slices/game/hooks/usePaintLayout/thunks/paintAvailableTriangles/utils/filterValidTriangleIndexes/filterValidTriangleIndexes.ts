import { PLAYERS, Round } from 'types/lib/backgammon';

interface Params {
    isDouble: boolean;
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

export default function filterValidTriangleIndexes({
    isDouble,
    validDices,
    startIndex,
    player,
    triangles,
}: Params) {
    const calculateDirectionFrom = DIRECTIONS_MAP[player];
    const calculatePossibleIndexes = calculateDirectionFrom(startIndex);
    const possibleTriangleIndexes = validDices.map(calculatePossibleIndexes);
    const validTriangleIndexes = isDouble
        ? getValidTrianglesOnDoubledDice(
              triangles,
              possibleTriangleIndexes,
              player
          )
        : getValidTriangles(triangles, possibleTriangleIndexes, player);

    return validTriangleIndexes;
}

function getValidTrianglesOnDoubledDice(
    triangles: Params['triangles'],
    tIndexes: number[],
    player: Params['player']
) {
    let validTriangles: number[] = [];

    for (const tIndex of tIndexes) {
        const triangle = triangles[tIndex];

        if (!triangle) break;

        if (triangleIsBlocked(player, triangle)) break;

        validTriangles.push(tIndex);
    }

    return validTriangles;
}

function getValidTriangles(
    triangles: Params['triangles'],
    tIndexes: number[],
    player: Params['player']
) {
    let validTriangles: number[] = [];
    const limit = tIndexes.length;

    for (let i = 0; i < limit; i++) {
        const tIndex = tIndexes[i];
        const triangle = triangles[tIndex];

        if (!triangle) continue;

        if (triangleIsBlocked(player, triangle)) {
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

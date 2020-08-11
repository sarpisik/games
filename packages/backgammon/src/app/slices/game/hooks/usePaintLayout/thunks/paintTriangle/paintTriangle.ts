import { EmitBrokenPointRound, EVENTS, OPPONENT } from 'types/lib/backgammon';
import { resetCurrentRoundLayout } from '../../../..';
import { PLAYERS } from '../../../../../../../views/game/components/Board/constants';
import { AppThunk } from '../../../../../../store';
import { calculateTargetTriangleIndex } from '../utils';

const decreseByOne = (num: number) => num - 1;

const paintTriangle = (
    targetX: number,
    targetY: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { game } = state;
    const [round] = game.rounds.slice(-1);
    const { id: roundId, layout } = round;

    const player = PLAYERS[color];
    const targetTriangles =
        color === 'BLACK' ? layout.slice(-6).reverse() : layout.slice(0, 6);

    const dice = round.dice.map(decreseByOne); // Triangles start from 0 index!
    const dices = dice.length > 2 ? dice.slice(0, 1) : dice;
    const opponent = OPPONENT[player];
    const availableTrianglesIndexes = [] as number[];

    for (let i = 0; i < dices.length; i++) {
        const d = dices[i];
        const targetTriangle = targetTriangles[d];
        const [owner, points] = targetTriangle;

        const triangleAvailable = owner !== opponent || points < 2;
        if (triangleAvailable) availableTrianglesIndexes.push(d);
    }

    const toTriangleIndex = calculateTargetTriangleIndex(targetX, targetY);
    const targetTriangleNotExist = toTriangleIndex < 0;
    const targetTriangleIndex =
        color === 'BLACK'
            ? layout.length - 1 - toTriangleIndex
            : toTriangleIndex;
    const targetTriangleInvalid =
        targetTriangleNotExist ||
        !availableTrianglesIndexes.includes(targetTriangleIndex);

    if (targetTriangleInvalid) {
        // dispatch(increaseAttempt());
        dispatch(resetCurrentRoundLayout());
    } else {
        const payload: EmitBrokenPointRound = {
            toTriangleIndex,
            color,
            roundId,
            gameId: game.id,
        };

        dispatch({ type: EVENTS.BROKEN_POINT_ROUND, payload });
    }
};

export default paintTriangle;

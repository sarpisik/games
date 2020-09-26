import { EmitBrokenPointRound } from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import { resetCurrentRoundLayout } from '../../../..';
import { PLAYERS } from '../../../../../../../views/game/components/Board/constants';
import { AppThunk } from '../../../../../../store';
import { calculateTargetTriangleIndex } from '../utils';

const paintTriangle = (
    targetX: number,
    targetY: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { game } = state;
    const [round] = game.rounds.slice(-1);
    const { id: roundId, availableTriangles } = round;

    const toTriangleIndex = calculateTargetTriangleIndex(targetX, targetY);
    const targetTriangleNotExist = toTriangleIndex < 0;
    const targetTriangleInvalid =
        targetTriangleNotExist || !availableTriangles.includes(toTriangleIndex);

    if (targetTriangleInvalid) {
        dispatch(resetCurrentRoundLayout());
    } else {
        const payload: EmitBrokenPointRound = {
            toTriangleIndex,
            color,
            roundId,
            gameId: game.id,
        };

        dispatch({ type: GAME_EVENTS.BROKEN_POINT_ROUND, payload });
    }
};

export default paintTriangle;

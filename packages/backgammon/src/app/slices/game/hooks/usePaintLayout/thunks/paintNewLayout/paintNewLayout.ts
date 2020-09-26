import {
    EmitCollectPointRound,
    EmitRound,
    PLAYERS,
    STAGES,
} from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import { AppThunk } from '../../../../../../store';
import { resetCurrentRoundLayout } from '../../../../game';
import { calculateTargetTriangleIndex } from '../utils';
import { calculateStage, validateCollectionStack } from './utils';

const paintNewLayout = (
    fromTriangleIndex: number,
    targetX: number,
    targetY: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { game, measures } = state;
    const { containers } = measures;
    const [round] = game.rounds.slice(-1);
    const { id: roundId, availableTriangles, layout } = round;

    const player = PLAYERS[color];
    const stage = calculateStage(player, layout);
    const shouldNotCollect = stage === STAGES.MOVE;

    if (shouldNotCollect && availableTriangles.length < 1) {
        dispatch(resetCurrentRoundLayout());
    } else {
        let targetInvalid = true;
        const notInTheStack = !validateCollectionStack({
            containers,
            player,
            targetX,
            targetY,
        });

        if (shouldNotCollect || notInTheStack) {
            const toTriangleIndex = calculateTargetTriangleIndex(
                targetX,
                targetY
            );
            const targetTriangleNotExist = toTriangleIndex < 0;
            targetInvalid =
                targetTriangleNotExist ||
                !availableTriangles.includes(toTriangleIndex);

            if (!targetInvalid) {
                const payload: EmitRound = {
                    fromTriangleIndex,
                    toTriangleIndex,
                    color,
                    roundId,
                    gameId: game.id,
                };
                dispatch({ type: GAME_EVENTS.ROUND, payload });
            }
        } else {
            targetInvalid = notInTheStack;

            if (!targetInvalid) {
                const payload: EmitCollectPointRound = {
                    fromTriangleIndex,
                    color,
                    roundId,
                    gameId: game.id,
                };
                dispatch({ type: GAME_EVENTS.COLLECT_POINT_ROUND, payload });
            }
        }

        targetInvalid && dispatch(resetCurrentRoundLayout());
    }
};

export default paintNewLayout;

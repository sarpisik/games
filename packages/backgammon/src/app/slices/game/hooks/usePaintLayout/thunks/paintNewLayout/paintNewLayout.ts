import {
    EmitRound,
    EVENTS,
    PLAYERS,
    STAGES,
    EmitCollectPointRound,
} from 'types/lib/backgammon';
import { resetCurrentRoundLayout } from '../../../../..';
import { AppThunk } from '../../../../../../store';
import { calculateTargetTriangleIndex } from '../utils';
import {
    calculateStage,
    filterValidDice,
    filterValidTriangleIndexes,
    validateCollectionStack,
} from './utils';

const paintNewLayout = (
    fromTriangleIndex: number,
    targetX: number,
    targetY: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { game } = state;
    const [round] = game.rounds.slice(-1);
    const { id: roundId, dice, layout } = round;

    const player = PLAYERS[color];
    const stage = calculateStage(player, layout);
    const shouldNotCollect = stage === STAGES.MOVE;
    const validDice = filterValidDice({
        startIndex: fromTriangleIndex,
        player,
        dices: dice,
        triangles: layout,
        stage,
    });
    const validTriangleIndexes = filterValidTriangleIndexes({
        validDices: validDice,
        startIndex: fromTriangleIndex,
        player,
        triangles: layout,
    });
    if (shouldNotCollect && validTriangleIndexes.length < 1) {
        dispatch(resetCurrentRoundLayout());
    } else {
        let targetInvalid = true;
        const notInTheStack = !validateCollectionStack(
            targetX,
            targetY,
            player
        );

        if (shouldNotCollect || notInTheStack) {
            const toTriangleIndex = calculateTargetTriangleIndex(
                targetX,
                targetY
            );
            const targetTriangleNotExist = toTriangleIndex < 0;
            targetInvalid =
                targetTriangleNotExist ||
                !validTriangleIndexes.includes(toTriangleIndex);

            if (!targetInvalid) {
                const payload: EmitRound = {
                    fromTriangleIndex,
                    toTriangleIndex,
                    color,
                    roundId,
                    gameId: game.id,
                };
                dispatch({ type: EVENTS.ROUND, payload });
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
                dispatch({ type: EVENTS.COLLECT_POINT_ROUND, payload });
            }
        }

        targetInvalid && dispatch(resetCurrentRoundLayout());
    }
};

export default paintNewLayout;

import { EmitRound, EVENTS } from 'types/lib/backgammon';
import { resetCurrentRoundLayout } from '../../../../..';
import { PLAYERS } from '../../../../../../../components/Board/constants';
import { AppThunk } from '../../../../../../store';
import { calculateTargetTriangleIndex } from '../utils';
import { filterValidDice, filterValidTriangleIndexes } from './utils';

const paintNewLayout = (
    fromTriangleIndex: number,
    targetX: number,
    targetY: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { game } = state;
    const [round] = game.rounds.slice(-1);
    const { dice, layout } = round;

    const player = PLAYERS[color];
    const validDice = filterValidDice(fromTriangleIndex, player, dice, layout);
    const validTriangleIndexes = filterValidTriangleIndexes(
        validDice,
        fromTriangleIndex,
        player,
        layout
    );

    if (validTriangleIndexes.length < 1) {
        // TODO: Jump next round
        alert('There is no valid triangle. Jumping to next round.');
        // TODO: reset layout
        dispatch(resetCurrentRoundLayout());
    } else {
        const toTriangleIndex = calculateTargetTriangleIndex(targetX, targetY);
        const targetTriangleNotExist = toTriangleIndex < 0;
        const targetTriangleInvalid =
            targetTriangleNotExist ||
            !validTriangleIndexes.includes(toTriangleIndex);

        if (targetTriangleInvalid) {
            // TODO: reset layout
            dispatch(resetCurrentRoundLayout());
        } else {
            const payload: EmitRound = {
                fromTriangleIndex,
                toTriangleIndex,
                color,
                round,
            };
            dispatch({ type: EVENTS.ROUND, payload });
        }
    }
};

export default paintNewLayout;

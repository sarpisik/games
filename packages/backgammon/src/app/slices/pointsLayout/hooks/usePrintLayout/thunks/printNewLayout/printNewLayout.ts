import { PLAYERS } from '../../../../../../../components/Board/constants';
import { AppThunk } from '../../../../../../store';
import { saveHistory } from '../../../../../history';
import { increaseBroken, NEXT_PLAYER, setMovement } from '../../../../../round';
import { editLayout, resetLayout } from '../../../../pointsLayout';
import { calculateTargetTriangleIndex } from '../utils';
import { filterValidDice, filterValidTriangleIndexes } from './utils';

const printNewLayout = (
    triangleIndex: number,
    targetX: number,
    targetY: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { pointsLayout, round } = state;
    const { layout } = pointsLayout;
    const [currentRound] = round.slice(-1);
    const { dice } = currentRound;

    const player = PLAYERS[color];
    const validDice = filterValidDice(triangleIndex, player, dice, layout);
    const validTriangleIndexes = filterValidTriangleIndexes(
        validDice,
        triangleIndex,
        player,
        layout
    );

    if (validTriangleIndexes.length < 1) {
        // TODO: Jump next round
        alert('There is no valid triangle. Jumping to next round.');
        // TODO: reset layout
        dispatch(resetLayout());
    } else {
        const targetTriangleIndex = calculateTargetTriangleIndex(
            targetX,
            targetY
        );
        const targetTriangleNotExist = targetTriangleIndex < 0;
        const targetTriangleInvalid =
            targetTriangleNotExist ||
            !validTriangleIndexes.includes(targetTriangleIndex);

        if (targetTriangleInvalid) {
            // TODO: reset layout
            dispatch(resetLayout());
        } else {
            // Movement is valid.
            // Copy current movement history.
            dispatch(saveHistory(currentRound, layout));

            // Paint new layout.
            const [owner, points] = layout[targetTriangleIndex];
            const shouldCapture = owner !== player;

            // Increase opponent broken points
            const opponentPointIsBroken =
                shouldCapture && owner === NEXT_PLAYER[player];
            opponentPointIsBroken && dispatch(increaseBroken(owner));

            // Print layout
            const prevTriangle = layout[triangleIndex];
            const updatedPrevTrianglePoints = prevTriangle[1] - 1;
            const isPrevWillBeEmpty = updatedPrevTrianglePoints < 1;
            const prev = {
                index: triangleIndex,
                triangle: [
                    isPrevWillBeEmpty ? PLAYERS.NONE : prevTriangle[0],
                    updatedPrevTrianglePoints,
                ],
            };
            const next = {
                index: targetTriangleIndex,
                triangle: [player, shouldCapture ? 1 : points + 1],
            };
            dispatch(editLayout({ prev, next }));

            // Edit round and jump next round if necessary
            const diceIndex = dice.findIndex((dice) => {
                const delta = Math.abs(targetTriangleIndex - triangleIndex);
                return dice === delta;
            });
            dispatch(setMovement(diceIndex));
        }
    }
};

export default printNewLayout;

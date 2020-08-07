import { PLAYERS } from '../../../../../../../components/Board/constants';
import { AppThunk } from '../../../../../../store';
import {
    decreaseBroken,
    increaseAttempt,
    increaseBroken,
    NEXT_PLAYER,
    setMovement,
} from '../../../../../round';
import { skipRoundByTimeOut } from '../../../../../shared';
import { editLayoutTriangle, resetLayout } from '../../../../pointsLayout';
import { calculateTargetTriangleIndex } from '../utils';
import { saveHistory } from '../../../../../history';

const decreseByOne = (num: number) => num - 1;

const paintTriangle = (
    targetX: number,
    targetY: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { pointsLayout, round } = state;
    const { layout } = pointsLayout;
    const player = PLAYERS[color];
    const targetTriangles =
        color === 'BLACK' ? layout.slice(-6).reverse() : layout.slice(0, 6);

    const [currentRound] = round.slice(-1);
    const dice = currentRound.dice.map(decreseByOne); // Triangles start from 0 index!
    const dices = dice.length > 2 ? dice.slice(0, 1) : dice;
    const opponent = NEXT_PLAYER[player];
    const availableTrianglesIndexes = [] as number[];

    for (let i = 0; i < dices.length; i++) {
        const dice = dices[i];
        const targetTriangle = targetTriangles[dice];
        const [owner, points] = targetTriangle;

        const triangleAvailable = owner !== opponent || points < 2;
        if (triangleAvailable) availableTrianglesIndexes.push(dice);
    }

    const shouldSkipRound = availableTrianglesIndexes.length < 1;
    if (shouldSkipRound) {
        skipRoundByTimeOut(dispatch);
    } else {
        const initIndex = calculateTargetTriangleIndex(targetX, targetY);
        const targetTriangleNotExist = initIndex < 0;
        const targetTriangleIndex =
            color === 'BLACK' ? layout.length - 1 - initIndex : initIndex;
        const targetTriangleInvalid =
            targetTriangleNotExist ||
            !availableTrianglesIndexes.includes(targetTriangleIndex);

        if (targetTriangleInvalid) {
            dispatch(increaseAttempt());
            dispatch(resetLayout());
        } else {
            // Copy current movement history.
            dispatch(saveHistory(currentRound, layout));

            const [owner, points] = layout[initIndex];
            const shouldCapture = owner !== player;
            // Increase opponent broken points
            const opponentPointIsBroken = shouldCapture && owner === opponent;
            opponentPointIsBroken && dispatch(increaseBroken(owner));

            // Point placed, decrese broken points.
            dispatch(decreaseBroken(player));

            // Print layout
            dispatch(
                editLayoutTriangle({
                    index: initIndex,
                    triangle: [player, shouldCapture ? 1 : points + 1],
                })
            );

            // Edit round and jump next round if necessary
            const diceIndex = dice.findIndex(
                (dice) => dice === targetTriangleIndex
            );
            dispatch(setMovement(diceIndex));
        }
    }
};

export default paintTriangle;

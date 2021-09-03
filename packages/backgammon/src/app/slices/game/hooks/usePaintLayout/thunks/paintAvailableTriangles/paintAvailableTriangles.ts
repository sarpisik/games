import { PLAYERS, STAGES, Round } from 'types/lib/backgammon';
import { AppThunk } from '../../../../../../store';
import {
    calculateStage,
    filterValidDice,
    filterValidTriangleIndexes,
    calculateStackIndex,
} from './utils';
import { setAvailableTriangles } from '../../../../game';

const paintAvailableTriangles = (
    fromTriangleIndex: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>,
    layout: Round['layout']
): AppThunk => async (dispatch, getState) => {
    let paintTriangles: number[] = [];
    const state = getState();
    const { game } = state;
    const [round] = game.rounds.slice(-1);
    const { dice } = round;

    const player = PLAYERS[color];
    const stage = calculateStage(player, layout);
    const collect = stage === STAGES.COLLECT;

    if (collect) {
        const stackIndex = await calculateStackIndex(
            player,
            fromTriangleIndex,
            dice,
            layout
        );
        paintTriangles = paintTriangles.concat(stackIndex);
    }

    const validTriangleIndexes = filterValidTriangleIndexes({
        isDouble: dice[0] === dice[1],
        collect,
        validDices: filterValidDice({
            startIndex: fromTriangleIndex,
            dice,
            triangles: layout,
            stage,
        }),
        startIndex: fromTriangleIndex,
        player,
        triangles: layout,
    });
    paintTriangles = paintTriangles.concat(validTriangleIndexes);

    dispatch(setAvailableTriangles(paintTriangles));
};

export default paintAvailableTriangles;

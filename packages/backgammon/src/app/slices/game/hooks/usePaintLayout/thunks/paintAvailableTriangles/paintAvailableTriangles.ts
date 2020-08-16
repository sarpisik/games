import { PLAYERS, STAGES } from 'types/lib/backgammon';
import { AppThunk } from '../../../../../../store';
import {
    calculateStage,
    filterValidDice,
    filterValidTriangleIndexes,
} from './utils';

const paintAvailableTriangles = (
    fromTriangleIndex: number,
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { game } = state;
    const [round] = game.rounds.slice(-1);
    const { dice, layout } = round;

    const player = PLAYERS[color];
    const stage = calculateStage(player, layout);
    const shouldNotCollect = stage === STAGES.MOVE;

    const validDice = filterValidDice({
        startIndex: fromTriangleIndex,
        player,
        dice,
        triangles: layout,
        stage,
    });
    const validTriangleIndexes = filterValidTriangleIndexes({
        isDouble: dice[0] === dice[1],
        validDices: validDice,
        startIndex: fromTriangleIndex,
        player,
        triangles: layout,
    });
    console.log(shouldNotCollect);
    console.log(validTriangleIndexes);
};

export default paintAvailableTriangles;

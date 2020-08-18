import { OPPONENT, Round } from 'types/lib/backgammon';
import { PLAYERS } from '../../../../../../../views/game/components/Board/constants';
import { AppThunk } from '../../../../../../store';
import { setAvailableTriangles } from '../../../../game';

const AREA_MAP = {
    [PLAYERS.BLACK]: {
        calculateArea: (layout: Round['layout']) => layout.slice(-6).reverse(),
        calculateTriangles: (tIndexes: number[]) =>
            tIndexes.map(transformTriangleIndexes),
    },
    [PLAYERS.WHITE]: {
        calculateArea: (layout: Round['layout']) => layout.slice(0, 6),
        calculateTriangles: (tIndexes: number[]) => tIndexes,
    },
};

const decreseByOne = (num: number) => num - 1;

const paintBrokenPointTriangles = (
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { game } = state;
    const [round] = game.rounds.slice(-1);
    const { layout } = round;

    const player = PLAYERS[color];
    const playerMap = AREA_MAP[player];
    const targetTriangles = playerMap.calculateArea(layout);

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

    dispatch(
        setAvailableTriangles(
            playerMap.calculateTriangles(availableTrianglesIndexes)
        )
    );
};

export default paintBrokenPointTriangles;

function transformTriangleIndexes(tIndex: number) {
    return 23 - tIndex;
}

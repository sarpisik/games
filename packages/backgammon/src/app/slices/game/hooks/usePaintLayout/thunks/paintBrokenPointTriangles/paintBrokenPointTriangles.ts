import { OPPONENT, Round } from 'types/lib/backgammon';
import { PLAYERS } from '../../../../../../../views/game/components/Board/constants';
import { AppThunk } from '../../../../../../store';
import { setAvailableTriangles } from '../../../../game';

const paintBrokenPointTriangles = (
    color: keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'>,
    layout: Round['layout']
): AppThunk => (dispatch, getState) => {
    const state = getState();
    const { game } = state;
    const [round] = game.rounds.slice(-1);

    const targetTriangles = calculateArea(layout);

    const dice = round.dice.map(decreseByOne); // Triangles start from 0 index!
    const dices = dice.length > 2 ? dice.slice(0, 1) : dice;
    const opponent = OPPONENT[PLAYERS[color]];
    const availableTrianglesIndexes = [] as number[];

    for (let i = 0; i < dices.length; i++) {
        const d = dices[i];
        const targetTriangle = targetTriangles[d];
        const [owner, points] = targetTriangle;

        const triangleAvailable = owner !== opponent || points < 2;
        if (triangleAvailable) availableTrianglesIndexes.push(d);
    }

    dispatch(setAvailableTriangles(availableTrianglesIndexes));
};

export default paintBrokenPointTriangles;

function calculateArea(layout: Round['layout']) {
    return layout.slice(0, 6);
}

function decreseByOne(n: number) {
    return n - 1;
}

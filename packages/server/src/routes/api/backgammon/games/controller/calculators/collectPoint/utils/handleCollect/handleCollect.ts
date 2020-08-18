import { OPPONENT, PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';
import { rollDices } from '../../../utils';

interface Params {
    round: Round;
    triangleIndex: number;
    deleteDicesFrom: number;
    deleteDicesCount: number;
    player: Round['player'];
}

const INDEX_MAP = {
    [PLAYERS.BLACK]: (index: number) => index,
    [PLAYERS.WHITE]: (index: number) => 23 - index,
};

export default async function handleCollect(params: Params) {
    const { round, deleteDicesFrom, deleteDicesCount, player } = params;

    const triangleIndex = INDEX_MAP[player](params.triangleIndex);
    const triangle = round.layout[triangleIndex];
    const [owner, points] = triangle;
    const newPoints = points - 1;

    // Paint new layout
    round.layout[triangleIndex] = [
        newPoints < 1 ? PLAYERS.NONE : owner,
        newPoints,
    ];

    // Generate new id
    await customPromise(() => {
        round.id = Date.now();
    });

    // Delete used dice
    await customPromise(() => {
        round.dice.splice(deleteDicesFrom, deleteDicesCount);
    });

    // Increase collected points
    round.collected[player] += 1;

    // Create new round if all dice used.
    const shouldJumpToNextRound = round.dice.length < 1;
    if (shouldJumpToNextRound) {
        round.player = OPPONENT[round.player];
        round.turn += 1;
        round.dice = await rollDices();
    }

    return round;
}

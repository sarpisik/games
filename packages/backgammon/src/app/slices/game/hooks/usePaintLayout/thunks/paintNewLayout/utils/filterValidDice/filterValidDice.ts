import { PLAYERS, STAGES } from 'types/lib/backgammon';
import { TrianglesLayout } from '../types/trianglesLayout';

interface Params {
    startIndex: number;
    player: PLAYERS;
    dices: number[];
    triangles: TrianglesLayout;
    stage: STAGES;
}

export default function filterValidDice({
    startIndex,
    player,
    dices,
    triangles,
    stage,
}: Params) {
    if (stage === STAGES.COLLECT) return dices;

    const limit = triangles.length;
    const isWhite = player === PLAYERS.WHITE;
    const validDice = dices.filter((digit) => {
        if (isWhite) return startIndex + digit < limit;
        return startIndex - digit >= 0;
    });

    return validDice;
}

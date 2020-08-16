import { PLAYERS, Round, STAGES } from 'types/lib/backgammon';
import { calculatePossibleDices } from './utils';

interface Params {
    startIndex: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    dice: number[];
    triangles: Round['layout'];
    stage: STAGES;
}

const DICES_MAP = {
    [PLAYERS.WHITE]: (limit: number) => (startIndex: number) => (
        digit: number
    ) => startIndex + digit < limit,
    [PLAYERS.BLACK]: (_limit: number) => (startIndex: number) => (
        digit: number
    ) => startIndex - digit >= 0,
};

export default function filterValidDice(params: Params) {
    const { startIndex, player, dice, triangles, stage } = params;

    const possibleDices = calculatePossibleDices(dice);

    if (stage === STAGES.COLLECT) return possibleDices;

    const validDiceFrom = DICES_MAP[player](triangles.length)(startIndex);
    const validDice = possibleDices.filter(validDiceFrom);

    return validDice;
}

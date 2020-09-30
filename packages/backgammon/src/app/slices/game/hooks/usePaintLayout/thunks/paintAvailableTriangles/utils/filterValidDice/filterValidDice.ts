import { Round, STAGES } from 'types/lib/backgammon';
import { calculatePossibleDices } from './utils';

interface Params {
    startIndex: number;
    dice: number[];
    triangles: Round['layout'];
    stage: STAGES;
}

export default function filterValidDice(params: Params) {
    const { startIndex, dice, triangles, stage } = params;

    const possibleDices = calculatePossibleDices(dice);

    if (stage === STAGES.COLLECT) return possibleDices;

    const validDice = possibleDices.filter(
        filterOnIterate(triangles.length, startIndex)
    );

    return validDice;
}

function filterOnIterate(limit: number, startIndex: number) {
    return function onIterate(digit: number) {
        return startIndex + digit < limit;
    };
}

import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromiseFilter } from '@shared/customPromise';
import { calculatePossibleDices } from '@routes/api/backgammon/games/controller/calculators/utils/filterValidDice/utils';

const DICES_MAP = {
    [PLAYERS.WHITE]: (limit: number, startIndex: number, digit: number) =>
        startIndex + digit <= limit,
    [PLAYERS.BLACK]: (_limit: number, startIndex: number, digit: number) =>
        startIndex - digit >= 0,
};

export default async function filterValidDice(
    triangleIndex: number,
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    dice: Round['dice'],
    trianglesLimit: number
) {
    const possibleDices = await calculatePossibleDices(dice);

    return customPromiseFilter(possibleDices, function onPossibleDiceFilter(
        possibleDice
    ) {
        const isValidDice = DICES_MAP[player](
            trianglesLimit,
            triangleIndex,
            possibleDice
        );

        return isValidDice;
    });
}

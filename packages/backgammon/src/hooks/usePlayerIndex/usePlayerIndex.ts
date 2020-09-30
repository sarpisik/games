import { useGame, useUser } from '../../app/slices';
import { checkPlayerIsBlack } from '../../utils';
import { OPPONENT } from 'types/lib/backgammon';

export default function usePlayerIndex() {
    const playerIsBlack = checkPlayerIsBlack(
        useUser().user.id,
        useGame().game.players,
        true
    );

    return {
        getPlayerIndex(i: Parameters<typeof getPlayerIndex>[1]) {
            return getPlayerIndex(playerIsBlack, i);
        },
        playerIsBlack,
    };
}
function getPlayerIndex(playerIsBlack: boolean, index: keyof typeof OPPONENT) {
    return playerIsBlack ? index : OPPONENT[index];
}

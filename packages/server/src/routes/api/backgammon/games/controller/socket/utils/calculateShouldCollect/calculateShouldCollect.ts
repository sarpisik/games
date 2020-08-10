import { PLAYERS, Round } from 'types/lib/backgammon';

export default function calculateShouldCollect(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    layout: Round['layout']
) {
    const isPlayerBlack = player === PLAYERS.BLACK;
    const start = isPlayerBlack ? 6 : 0;
    const end = isPlayerBlack ? layout.length : layout.length - 6;
    const shouldMove = layout
        .slice(start, end)
        .some(([owner]) => owner === player);

    return !shouldMove;
}

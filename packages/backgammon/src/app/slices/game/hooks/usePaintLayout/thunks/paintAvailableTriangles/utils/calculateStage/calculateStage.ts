import { PLAYERS, Round, STAGES } from 'types/lib/backgammon';

export default function calculateStage(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    layout: Round['layout']
): STAGES {
    const isPlayerBlack = player === PLAYERS.BLACK;
    const start = isPlayerBlack ? 6 : 0;
    const end = isPlayerBlack ? layout.length : layout.length - 6;
    const shouldMove = layout
        .slice(start, end)
        .some(([owner]) => owner === player);

    const stage = shouldMove ? STAGES.MOVE : STAGES.COLLECT;

    return stage;
}

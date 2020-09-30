import { PLAYERS, Round, STAGES } from 'types/lib/backgammon';

export default function calculateStage(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    layout: Round['layout']
): STAGES {
    const shouldMove = layout
        .slice(0, layout.length - 6)
        .some(([owner]) => owner === player);

    const stage = shouldMove ? STAGES.MOVE : STAGES.COLLECT;

    return stage;
}

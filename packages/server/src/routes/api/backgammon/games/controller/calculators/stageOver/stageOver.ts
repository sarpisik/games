import { EmitStageOver, PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';

export default async function calculateStageOver(round: Round) {
    const calculateWinner = handleWinner(round);

    const winners = await Promise.all([
        calculateWinner(PLAYERS.WHITE),
        calculateWinner(PLAYERS.BLACK),
    ]);
    const [whiteWinner, blackWinner] = winners;

    if (whiteWinner) return createStageOverPayload(PLAYERS.WHITE);
    else if (blackWinner) return createStageOverPayload(PLAYERS.BLACK);
    else return null;
}

function handleWinner(round: Round) {
    return (player: keyof Round['collected']) =>
        customPromise(() => round.collected[player] === 15);
}

function createStageOverPayload(
    winner: keyof Round['collected']
): Promise<EmitStageOver> {
    return customPromise(() => ({ winner }));
}

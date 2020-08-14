import { EmitStageOver, PLAYERS, Round } from '@shared-types/backgammon';

export default function calculateStageOver(round: Round) {
    return new Promise<EmitStageOver | null>((resolve, reject) => {
        setImmediate(() => {
            try {
                const calculateWinner = handleWinner(round);
                const whiteWinner = calculateWinner(PLAYERS.WHITE);
                const blackWinner = calculateWinner(PLAYERS.BLACK);

                if (whiteWinner) resolve(createStageOverPayload(PLAYERS.WHITE));
                else if (blackWinner)
                    resolve(createStageOverPayload(PLAYERS.BLACK));
                else resolve(null);
            } catch (error) {
                reject(error);
            }
        });
    });
}

function handleWinner(round: Round) {
    return function calculateWinner(player: keyof Round['collected']) {
        return round.collected[player] === 15;
    };
}

function createStageOverPayload(
    winner: keyof Round['collected']
): EmitStageOver {
    return { winner };
}

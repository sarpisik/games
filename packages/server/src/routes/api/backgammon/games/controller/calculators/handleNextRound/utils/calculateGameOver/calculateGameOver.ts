import { Round, PLAYERS, EmitGameOver } from 'types/lib/backgammon';

export default function calculateGameOver(round: Round) {
    return new Promise<EmitGameOver | null>((resolve, reject) => {
        setImmediate(() => {
            try {
                const calculateWinner = handleWinner(round);
                const whiteWinner = calculateWinner(PLAYERS.WHITE);
                const blackWinner = calculateWinner(PLAYERS.BLACK);

                if (whiteWinner) resolve(createGameOverPayload(PLAYERS.WHITE));
                else if (blackWinner)
                    resolve(createGameOverPayload(PLAYERS.BLACK));
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

function createGameOverPayload(winner: keyof Round['collected']): EmitGameOver {
    return { winner };
}

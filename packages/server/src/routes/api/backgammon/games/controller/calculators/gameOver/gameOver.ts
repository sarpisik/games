import { Game, PLAYERS } from '@shared-types/backgammon';

type Winner = [PLAYERS.WHITE | PLAYERS.BLACK, number];

export default function calculateGameOver(
    stage: Game['stages'],
    score: Game['score']
) {
    return new Promise<Winner | null>((resolve, reject) => {
        setImmediate(() => {
            try {
                const scores = (Object.entries(score) as unknown) as Winner[];

                setImmediate(() => {
                    try {
                        const winner = scores.find(
                            ([, score]) => score === stage
                        );

                        if (winner) resolve(winner);
                        else resolve(null);
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    });
}

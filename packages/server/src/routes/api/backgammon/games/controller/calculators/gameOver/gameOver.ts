import { Game } from '@shared-types/backgammon';
import { customPromise, customPromiseFind } from '@shared/customPromise';

type Winner = [string, number];

export default async function calculateGameOver(
    stage: Game['stages'],
    score: Game['score']
) {
    const scores = await customPromise(
        () => (Object.entries(score) as unknown) as Winner[]
    );

    const winner = await customPromiseFind(
        scores,
        ([, score]) => score === stage
    );

    return winner || null;
}

import { Round, OPPONENT } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';

export default async function calculateMars(
    winner: Round['player'],
    collected: Round['collected']
) {
    const loserCollected = await customPromise(
        () => collected[OPPONENT[winner]]
    );

    return loserCollected === 0;
}

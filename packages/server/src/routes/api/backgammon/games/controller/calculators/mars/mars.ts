import { Round, OPPONENT } from '@shared-types/backgammon';

export default async function calculateMars(
    winner: Round['player'],
    collected: Round['collected']
) {
    const loserCollected = collected[OPPONENT[winner]];

    return loserCollected === 0;
}

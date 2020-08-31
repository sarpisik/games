import { Round } from '@shared-types/backgammon';

import {
    calculateAvailableTriangleForBrokens,
    calculateAvailableTriangleExist,
} from './utils';

export default async function calculateSkipRound(round: Round) {
    const shouldCalculateAvailableTriangleForBrokens =
        round.brokens[round.player] > 0;
    const promise = shouldCalculateAvailableTriangleForBrokens
        ? calculateAvailableTriangleForBrokens(round)
        : calculateAvailableTriangleExist(round);
    const shouldNotSkipRound = await promise;

    return !shouldNotSkipRound;
}

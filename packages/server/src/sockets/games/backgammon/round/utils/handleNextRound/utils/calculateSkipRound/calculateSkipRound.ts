import { Round } from 'types/lib/backgammon';

import {
    calculateAvailableTriangleForBrokens,
    calculateAvailableTriangleExist,
} from './utils';

export default function calculateSkipRound(round: Round) {
    const shouldCalculateAvailableTriangleForBrokens =
        round.brokens[round.player] > 0;
    const shoulSkipRound = !(shouldCalculateAvailableTriangleForBrokens
        ? calculateAvailableTriangleForBrokens(round)
        : calculateAvailableTriangleExist(round));

    return shoulSkipRound;
}

import { usePointsLayout, useRound } from '../../../../../../app/slices';
import {
    calculateAvailableTriangleExist,
    calculateAvailableTriangleForBrokens,
} from './utils';
import { useEffect } from 'react';

// TODO: movement history should has its own store.
// because it is triggering re render and it causes
// skip round sometimes.

export default function useCalculateAvailableMovements() {
    const [round, dispatch] = useRound();
    const [layout] = usePointsLayout();

    const shouldCalculateAvailableTriangleForBrokens =
        round?.brokens[round?.player] > 0;
    const shoulSkipRound = !(shouldCalculateAvailableTriangleForBrokens
        ? calculateAvailableTriangleForBrokens(
              round?.player,
              round?.dice,
              layout
          )
        : calculateAvailableTriangleExist(round?.player, round?.dice, layout));

    useEffect(
        function handleSkipRoundOnChange() {
            if (shoulSkipRound) {
                dispatch.skipRound();
            }
        },

        // skip static method dispatch.skipRound()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [shoulSkipRound]
    );

    return shoulSkipRound;
}

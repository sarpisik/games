import { PLAYERS } from 'types/lib/backgammon';
import { useRound } from '../../../../../../../../../../app/slices';
import { LAYOUTS, SIZES } from '../../../../../../constants';
import { generateCollectedPoints } from './utils';

export default function useCollectedPoints() {
    const round = useRound();

    const whiteCollectedPoints = generateCollectedPoints({
        points: round?.collected[PLAYERS.WHITE],
        y: LAYOUTS.CONTAINERS[3].y + SIZES.CONTAINER_HEIGHT - 1,
        baseContainer: LAYOUTS.CONTAINERS[3],
        color: '#ffffff',
        stroke: '#000000',
        reverse: false,
    });

    const blackCollectedPoints = generateCollectedPoints({
        points: round?.collected[PLAYERS.BLACK],
        y: LAYOUTS.CONTAINERS[0].y,
        baseContainer: LAYOUTS.CONTAINERS[0],
        color: '#000000',
        reverse: true,
        stroke: '#ffffff',
    });

    return [blackCollectedPoints, whiteCollectedPoints] as const;
}

import { PLAYERS } from 'types/lib/backgammon';
import {
    useContainers,
    useRound,
} from '../../../../../../../../../../app/slices';
import { useSizes } from '../../../../../../../../../../app/slices/measures';
import { generateCollectedPoints } from './utils';

export default function useCollectedPoints() {
    const round = useRound();
    const sizes = useSizes();
    const containers = useContainers();
    const { CONTAINER_WIDTH, CONTAINER_HEIGHT } = sizes;

    const whiteCollectedPoints = generateCollectedPoints({
        baseContainer: containers[3],
        color: '#ffffff',
        points: round?.collected[PLAYERS.WHITE],
        reverse: false,
        stroke: '#000000',
        width: CONTAINER_WIDTH,
        y: containers[3].y + CONTAINER_HEIGHT - 1,
    });

    const blackCollectedPoints = generateCollectedPoints({
        baseContainer: containers[0],
        color: '#000000',
        points: round?.collected[PLAYERS.BLACK],
        reverse: true,
        stroke: '#ffffff',
        width: CONTAINER_WIDTH,
        y: containers[0].y,
    });

    return [blackCollectedPoints, whiteCollectedPoints] as const;
}

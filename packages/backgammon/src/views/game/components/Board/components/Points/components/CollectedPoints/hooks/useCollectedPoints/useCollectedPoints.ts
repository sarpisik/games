import { PLAYERS } from 'types/lib/backgammon';
import {
    useContainers,
    useRound,
} from '../../../../../../../../../../app/slices';
import { useSizes } from '../../../../../../../../../../app/slices/measures';
import { OFFSETS } from '../../../../../../constants';
import { generateCollectedPoints } from './utils';

type Image = Parameters<typeof generateCollectedPoints>[0]['image'];

interface Params {
    pLight: Image;
    pDark: Image;
}
const { TOP_BLOCK_START_Y, BOTTOM_BLOCK_START_Y } = OFFSETS;

export default function useCollectedPoints(params: Params) {
    const { pDark, pLight } = params;
    const round = useRound();

    const sizes = useSizes();
    const { CONTAINER_WIDTH } = sizes;

    const containers = useContainers();
    const heightLimit = sizes.TRIANGLE_HEIGHT;

    const whiteCollectedPoints = generateCollectedPoints({
        baseContainer: containers[3],
        image: pLight,
        points: round?.collected[PLAYERS.WHITE],
        width: CONTAINER_WIDTH,
        heightLimit,
        y: BOTTOM_BLOCK_START_Y,
        x: 1,
    });

    const blackCollectedPoints = generateCollectedPoints({
        baseContainer: containers[0],
        image: pDark,
        points: round?.collected[PLAYERS.BLACK],
        width: CONTAINER_WIDTH,
        heightLimit,
        y: TOP_BLOCK_START_Y,
        x: 1,
    });

    return [blackCollectedPoints, whiteCollectedPoints] as const;
}

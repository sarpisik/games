import { PLAYERS } from 'types/lib/backgammon';
import {
    useContainers,
    useRound,
} from '../../../../../../../../../../app/slices';
import { useSizes } from '../../../../../../../../../../app/slices/measures';
import { OFFSETS } from '../../../../../../../../../../configs';
import { usePlayerIndex } from '../../../../../../../../../../hooks';
import { useUnitMeasure } from '../useUnitMeasure';
import { generateCollectedPoints } from './utils';

type Image = Parameters<typeof generateCollectedPoints>[0]['image'];

interface Params {
    pLight: Image;
    pDark: Image;
}
const { POINT_TOP_START_Y, POINT_BOTTOM_START_Y, LEFT_BLOCK_START_X } = OFFSETS;

export default function useCollectedPoints(params: Params) {
    const { pDark, pLight } = params;
    const round = useRound();

    const unitMeasure = useUnitMeasure();

    const sizes = useSizes();
    const { CONTAINER_WIDTH } = sizes;

    const containers = useContainers();
    const heightLimit = sizes.CONTAINER_HEIGHT;
    const { getPlayerIndex, playerIsBlack } = usePlayerIndex();

    const points = [
        {
            baseContainer: containers[3],
            image: playerIsBlack ? pDark : pLight,
            points: round?.collected[getPlayerIndex(PLAYERS.BLACK)],
            width: CONTAINER_WIDTH,
            heightLimit,
            y: POINT_BOTTOM_START_Y,
            x: LEFT_BLOCK_START_X,
        },
        {
            baseContainer: containers[0],
            image: playerIsBlack ? pLight : pDark,
            points: round?.collected[getPlayerIndex(PLAYERS.WHITE)],
            width: CONTAINER_WIDTH,
            heightLimit,
            y: POINT_TOP_START_Y,
            x: LEFT_BLOCK_START_X,
        },
    ]
        .map(generateCollectedPoints)
        .map((_points) =>
            _points.length > 0
                ? _points.map((_point) => {
                      const width = unitMeasure(_point.width, 'x');

                      return {
                          ..._point,
                          x: unitMeasure(_point.x, 'x'),
                          y: unitMeasure(_point.y, 'x'),
                          width,
                          height: width,
                      };
                  })
                : _points
        );

    return points;
}

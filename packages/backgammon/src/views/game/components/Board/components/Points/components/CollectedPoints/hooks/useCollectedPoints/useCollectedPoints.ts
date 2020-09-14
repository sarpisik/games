import { PLAYERS } from 'types/lib/backgammon';
import {
    useContainers,
    useRound,
} from '../../../../../../../../../../app/slices';
import { useSizes } from '../../../../../../../../../../app/slices/measures';
import { OFFSETS } from '../../../../../../../../../../config';
import { useUnitMeasure } from '../useUnitMeasure';
import { generateCollectedPoints } from './utils';

type Image = Parameters<typeof generateCollectedPoints>[0]['image'];

interface Params {
    pLight: Image;
    pDark: Image;
}
const {
    TOP_BLOCK_START_Y,
    POINT_BOTTOM_START_Y,
    LEFT_CONTAINER_START_X,
} = OFFSETS;

export default function useCollectedPoints(params: Params) {
    const { pDark, pLight } = params;
    const round = useRound();

    const unitMeasure = useUnitMeasure();

    const sizes = useSizes();
    const { CONTAINER_WIDTH } = sizes;

    const containers = useContainers();
    const heightLimit = sizes.CONTAINER_HEIGHT;

    const points = [
        {
            baseContainer: containers[3],
            image: pLight,
            points: round?.collected[PLAYERS.WHITE],
            width: CONTAINER_WIDTH,
            heightLimit,
            y: POINT_BOTTOM_START_Y,
            x: LEFT_CONTAINER_START_X,
        },
        {
            baseContainer: containers[0],
            image: pDark,
            points: round?.collected[PLAYERS.BLACK],
            width: CONTAINER_WIDTH,
            heightLimit,
            y: TOP_BLOCK_START_Y,
            x: LEFT_CONTAINER_START_X,
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
                          y: unitMeasure(_point.y, 'y'),
                          width,
                          height: width,
                      };
                  })
                : _points
        );

    return points;
}

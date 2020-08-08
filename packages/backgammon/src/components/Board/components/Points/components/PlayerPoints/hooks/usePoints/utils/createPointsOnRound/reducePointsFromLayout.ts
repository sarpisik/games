import {
    usePointsLayout,
    useRound,
} from '../../../../../../../../../../app/slices';
import { OFFSETS, PLAYERS } from '../../../../../../../../constants';
import { DIRECTIONS } from '../../types';
import { fillTriangle, isPlayer, isTopBlock, xOffsetCalculator } from './utils';
import { Point } from '../../../../../shared/components';

type Layout = ReturnType<typeof usePointsLayout>[0];
type Round = ReturnType<typeof useRound>;

const {
    LEFT_BLOCK_START_X,
    RIGHT_BLOCK_START_X,
    LEFT_BLOCK_TRIANGLE_END_X,
    RIGHT_BLOCK_TRIANGLE_END_X,
    TOP_BLOCK_START_Y,
    BOTTOM_BLOCK_START_Y,
} = OFFSETS;

export default function createPointsOnRound(
    round: Round,
    onDragEnd: Parameters<typeof fillTriangle>[0]['onDragEnd']
) {
    return function reducePointsFromLayout(
        points: React.ComponentProps<typeof Point>[],
        [player, count]: Layout[number],
        triangleIndex: number
    ) {
        const isLeftBlock = triangleIndex < 6 || triangleIndex > 17;
        const isTop = isTopBlock(triangleIndex);
        const direction = isTop ? DIRECTIONS.FORMARD : DIRECTIONS.BACKWARD;

        const xBlock = isTop
            ? isLeftBlock
                ? LEFT_BLOCK_START_X
                : RIGHT_BLOCK_START_X
            : isLeftBlock
            ? LEFT_BLOCK_TRIANGLE_END_X
            : RIGHT_BLOCK_TRIANGLE_END_X;
        const yBlock = isTop ? TOP_BLOCK_START_Y : BOTTOM_BLOCK_START_Y;
        const isRoundPlayer = round?.player === player;
        const hasNoBroken = isPlayer(player) && round?.brokens[player] < 1;
        const draggable = isRoundPlayer && hasNoBroken;

        // If not empty triangle
        if (player !== PLAYERS.NONE) {
            const color = PLAYERS[player];
            const fullTriangle = fillTriangle({
                triangleIndex,
                color,
                count,
                draggable,
                xOffset: xOffsetCalculator(
                    triangleIndex % 6,
                    xBlock,
                    direction
                ),
                yOffset: yBlock,
                onDragEnd,
            });
            points = [...points, ...fullTriangle];
        }

        return points;
    };
}

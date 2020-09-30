import { GameClient, PLAYERS, Round } from 'types/lib/backgammon';
import { OFFSETS } from '../../../../../../../../../../../../configs';
import { Point } from '../../../../../shared/components';
import { DIRECTIONS } from '../../types';
import { fillTriangle, isPlayer, isTopBlock, xOffsetCalculator } from './utils';

const {
    TOP_LEFT_POINTS_START_X,
    TOP_RIGHT_POINTS_START_X,
    BOTTOM_LEFT_POINTS_START_X,
    BOTTOM_RIGHT_POINTS_START_X,
    POINT_TOP_START_Y,
    POINT_BOTTOM_START_Y,
} = OFFSETS;

type FillTriangleParams = Parameters<typeof fillTriangle>[0];

interface Params {
    isRoundPlayer: GameClient['isRoundPlayer'];
    round: Round;
    pLight?: HTMLImageElement;
    pDark?: HTMLImageElement;
    onDragEnd: FillTriangleParams['onDragEnd'];
    onDragStart: FillTriangleParams['onDragStart'];
}

export default function createPointsOnRound(params: Params) {
    const {
        isRoundPlayer,
        round,
        pLight,
        pDark,
        onDragEnd,
        onDragStart,
    } = params;

    const roundPlayer = round?.player;

    return function reducePointsFromLayout(
        points: React.ComponentProps<typeof Point>[],
        [player, count]: Round['layout'][number],
        triangleIndex: number
    ) {
        const isLeftBlock = triangleIndex < 6 || triangleIndex > 17;
        const isTop = isTopBlock(triangleIndex);
        const direction = isTop ? DIRECTIONS.FORMARD : DIRECTIONS.BACKWARD;

        const xBlock = isTop
            ? isLeftBlock
                ? TOP_LEFT_POINTS_START_X
                : TOP_RIGHT_POINTS_START_X
            : isLeftBlock
            ? BOTTOM_LEFT_POINTS_START_X
            : BOTTOM_RIGHT_POINTS_START_X;
        const yBlock = isTop ? POINT_TOP_START_Y : POINT_BOTTOM_START_Y;
        const _isRoundPlayer = isRoundPlayer && roundPlayer === player;
        const hasNoBroken = isPlayer(player) && round?.brokens[player] < 1;
        const draggable = _isRoundPlayer && hasNoBroken;
        const color = PLAYERS[player].toLowerCase();
        const fillPatternImage = color === 'black' ? pDark : pLight;

        // If not empty triangle
        if (player !== PLAYERS.NONE) {
            const triangle: FillTriangleParams = {
                triangleIndex,
                count,
                draggable,
                fillPatternImage,
                xOffset: xOffsetCalculator(
                    triangleIndex % 6,
                    xBlock,
                    direction
                ),
                yOffset: yBlock,
                onDragEnd,
                onDragStart,
            };

            const fullTriangle = fillTriangle(triangle);
            points = [...points, ...fullTriangle];
        }

        return points;
    };
}

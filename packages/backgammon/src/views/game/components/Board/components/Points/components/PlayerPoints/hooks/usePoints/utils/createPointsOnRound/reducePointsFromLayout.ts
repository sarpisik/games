import { GameClient, PLAYERS, Round } from 'types/lib/backgammon';
import { OFFSETS } from '../../../../../../../../../../../../config';
import { Point } from '../../../../../shared/components';
import { DIRECTIONS } from '../../types';
import { fillTriangle, isPlayer, isTopBlock, xOffsetCalculator } from './utils';

const {
    LEFT_BLOCK_START_X,
    RIGHT_BLOCK_START_X,
    LEFT_BLOCK_TRIANGLE_END_X,
    RIGHT_BLOCK_TRIANGLE_END_X,
    TOP_BLOCK_START_Y,
    BOTTOM_BLOCK_START_Y,
} = OFFSETS;

type FillTriangleParams = Parameters<typeof fillTriangle>[0];

interface Params {
    game: GameClient;
    round: Round;
    triangleHeight: number;
    pLight?: HTMLImageElement;
    pDark?: HTMLImageElement;
    onDragEnd: FillTriangleParams['onDragEnd'];
    onDragStart: FillTriangleParams['onDragStart'];
}

export default function createPointsOnRound(params: Params) {
    const {
        game,
        round,
        triangleHeight,
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
                ? LEFT_BLOCK_START_X
                : RIGHT_BLOCK_START_X
            : isLeftBlock
            ? LEFT_BLOCK_TRIANGLE_END_X
            : RIGHT_BLOCK_TRIANGLE_END_X;
        const yBlock = isTop ? TOP_BLOCK_START_Y : BOTTOM_BLOCK_START_Y;
        const isRoundPlayer = game.isRoundPlayer && roundPlayer === player;
        const hasNoBroken = isPlayer(player) && round?.brokens[player] < 1;
        const draggable = isRoundPlayer && hasNoBroken;
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
                heightLimit: triangleHeight,
                onDragEnd,
                onDragStart,
            };

            const fullTriangle = fillTriangle(triangle);
            points = [...points, ...fullTriangle];
        }

        return points;
    };
}

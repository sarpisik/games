import { OFFSETS, PLAYERS } from '../../../../../../../../constants';
import { Point } from '../../../../../shared/components';
import { DIRECTIONS } from '../../types';
import { fillTriangle, isPlayer, isTopBlock, xOffsetCalculator } from './utils';
import { Game, User, Round } from 'types/lib/backgammon';

const {
    LEFT_BLOCK_START_X,
    RIGHT_BLOCK_START_X,
    LEFT_BLOCK_TRIANGLE_END_X,
    RIGHT_BLOCK_TRIANGLE_END_X,
    TOP_BLOCK_START_Y,
    BOTTOM_BLOCK_START_Y,
} = OFFSETS;

interface Params {
    user: User;
    game: Game;
    round: Round;
    onDragEnd: Parameters<typeof fillTriangle>[0]['onDragEnd'];
}

export default function createPointsOnRound({
    user,
    game,
    round,
    onDragEnd,
}: Params) {
    const roundPlayer = round?.player;
    const roundPlayerId = game.players[roundPlayer];
    const roundPlayerIsUser = user.id === roundPlayerId;

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
        const isRoundPlayer = roundPlayerIsUser && roundPlayer === player;
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

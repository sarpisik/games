import { OFFSETS } from '../../../../../../../../../../constants';
import { useUnit } from '../../../../../../../../../../hooks/useUnit';
import { CircleProps } from '../../Circle';
import { CIRCLE_SIZE } from '../../constants';

const POINT_SIZE = CIRCLE_SIZE.RADIUS;
const {
    RIGHT_BLOCK_END_X,
    TOP_BLOCK_START_Y,
    BOTTOM_BLOCK_START_Y,
    LEFT_CONTAINER_START_X,
} = OFFSETS;

export type OnDragMove = CircleProps['onDragMove'];

export default function useDragMoveHandler(): OnDragMove {
    const { getUnit, getUnitReverse } = useUnit();

    const onDragMove: OnDragMove = ({ target }) => {
        const targetX = getUnit(target.attrs.x);
        const targetY = getUnit(target.attrs.y);
        const isOverLeft = targetX - POINT_SIZE < LEFT_CONTAINER_START_X;
        const isOverRight = targetX > RIGHT_BLOCK_END_X + POINT_SIZE;
        const isOverTop = targetY - POINT_SIZE < TOP_BLOCK_START_Y;
        const isOverBottom = targetY + POINT_SIZE > BOTTOM_BLOCK_START_Y;
        const pointIsOverTheFrame =
            isOverLeft || isOverRight || isOverTop || isOverBottom;

        if (pointIsOverTheFrame) {
            const x = getUnitReverse(
                isOverLeft
                    ? LEFT_CONTAINER_START_X + POINT_SIZE
                    : isOverRight
                    ? RIGHT_BLOCK_END_X + POINT_SIZE
                    : targetX
            );
            const y = getUnitReverse(
                isOverTop
                    ? TOP_BLOCK_START_Y + POINT_SIZE
                    : isOverBottom
                    ? BOTTOM_BLOCK_START_Y - POINT_SIZE
                    : targetY
            );

            target.position({ x, y });
        }
    };

    return onDragMove;
}

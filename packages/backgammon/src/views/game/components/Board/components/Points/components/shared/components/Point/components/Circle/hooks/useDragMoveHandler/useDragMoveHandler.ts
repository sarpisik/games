import { OFFSETS } from '../../../../../../../../../../constants';
import { useUnit } from '../../../../../../../../../../hooks/useUnit';
import { CircleProps } from '../../Circle';
import { CIRCLE_SIZE } from '../../constants';

const POINT_SIZE = CIRCLE_SIZE.RADIUS * 2;
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
        const targetX = getUnit(target.attrs.x, 'x');
        const targetY = getUnit(target.attrs.y, 'y');

        const isOverLeft = targetX < LEFT_CONTAINER_START_X;
        const isOverRight = targetX > RIGHT_BLOCK_END_X;

        const isOverTop = targetY < TOP_BLOCK_START_Y;
        const isOverBottom = targetY + POINT_SIZE > BOTTOM_BLOCK_START_Y - 1;

        const pointIsOverTheFrame =
            isOverLeft || isOverRight || isOverTop || isOverBottom;

        if (pointIsOverTheFrame) {
            const x = getUnitReverse(
                isOverLeft
                    ? LEFT_CONTAINER_START_X
                    : isOverRight
                    ? RIGHT_BLOCK_END_X
                    : targetX,
                'x'
            );
            const y = getUnitReverse(
                isOverTop
                    ? TOP_BLOCK_START_Y
                    : isOverBottom
                    ? BOTTOM_BLOCK_START_Y - 1 - POINT_SIZE
                    : targetY,
                'y'
            );

            target.position({ x, y });
        }
    };

    return onDragMove;
}

import { OFFSETS } from '../../../../../../../../../../../../../../configs';
import { useUnit } from '../../../../../../../../../../hooks/useUnit';
import { CircleProps } from '../../Circle';

const {
    LEFT_BLOCK_START_X,
    LEFT_CONTAINER_START_X,
    POINT_BOTTOM_START_Y,
    POINT_TOP_START_Y,
} = OFFSETS;

export type OnDragMove = CircleProps['onDragMove'];

export default function useDragMoveHandler(): OnDragMove {
    const { getUnit, getUnitReverse } = useUnit();

    const onDragMove: OnDragMove = ({ target }) => {
        const targetX = getUnit(target.attrs.x, 'x');
        const targetY = getUnit(target.attrs.y, 'x');

        const isOverLeft = targetX < LEFT_BLOCK_START_X;
        const isOverRight = targetX > LEFT_CONTAINER_START_X;

        const isOverTop = targetY < POINT_TOP_START_Y;
        const isOverBottom = targetY > POINT_BOTTOM_START_Y;

        const pointIsOverTheFrame =
            isOverLeft || isOverRight || isOverTop || isOverBottom;

        if (pointIsOverTheFrame) {
            const x = getUnitReverse(
                isOverLeft
                    ? LEFT_BLOCK_START_X
                    : isOverRight
                    ? LEFT_CONTAINER_START_X
                    : targetX,
                'x'
            );
            const y = getUnitReverse(
                isOverTop
                    ? POINT_TOP_START_Y
                    : isOverBottom
                    ? POINT_BOTTOM_START_Y
                    : targetY,
                'x'
            );

            target.position({ x, y });
        }
    };

    return onDragMove;
}

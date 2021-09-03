import { LAYOUTS } from '../../../../../../../../views/game/components/Board/constants';

export default function calculateTargetTriangleIndex(
    targetX: number,
    targetY: number
) {
    const targetTriangleIndex = LAYOUTS.TRIANGLES.findIndex(
        function findTriangleIndex({ x, width, height, y }) {
            const triangleStart = x;
            const triangleEnd = x + width;
            const targetTriangleX =
                targetX >= triangleStart && targetX <= triangleEnd;
            const isBottomBlock = height < 0;
            const targetTriangleY = isBottomBlock
                ? targetY >= height + y
                : targetY <= height + y;

            return targetTriangleX && targetTriangleY;
        }
    );

    return targetTriangleIndex;
}

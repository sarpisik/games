import { COLORS, OFFSETS } from '../../../../../config';
import { calculateSizes } from '../sizes';
import { TrianglesLayout, TrianglesRow } from './types';

const {
    BOTTOM_BLOCK_START_Y,
    BOTTOM_LEFT_TRIANGLES_START,
    TOP_LEFT_TRIANGLES_START,
    BOTTOM_RIGHT_TRIANGLES_START,
    TOP_RIGHT_TRIANGLES_START,
    TOP_BLOCK_START_Y,
    TRIANGLE_WIDTH,
} = OFFSETS;

export default function calculateTriangles(
    sizes: ReturnType<typeof calculateSizes>
) {
    const { TRIANGLE_WIDTH, TRIANGLE_HEIGHT } = sizes;
    const TRIANGLES = [
        Array(6).fill(
            generateTriangleDimensions(TRIANGLE_WIDTH, TRIANGLE_HEIGHT)
        ),
        Array(6).fill(
            generateTriangleDimensions(TRIANGLE_WIDTH, TRIANGLE_HEIGHT)
        ),
        Array(6).fill(
            generateTriangleDimensions(TRIANGLE_WIDTH, TRIANGLE_HEIGHT * -1)
        ),
        Array(6).fill(
            generateTriangleDimensions(TRIANGLE_WIDTH, TRIANGLE_HEIGHT * -1)
        ),
    ] as TrianglesLayout;

    return TRIANGLES.map(setOffsets).flat();
}

function generateTriangleDimensions(width: number, height: number) {
    return { width, height };
}

function setOffsets(triangles: TrianglesLayout[number], index: number) {
    switch (index) {
        case 0:
            return triangles.map(
                setOffset(TOP_LEFT_TRIANGLES_START, TOP_BLOCK_START_Y)
            );
        case 1:
            return triangles.map(
                setOffset(TOP_RIGHT_TRIANGLES_START, TOP_BLOCK_START_Y)
            );
        case 2:
            return triangles.map(
                setOffset(
                    BOTTOM_RIGHT_TRIANGLES_START,
                    BOTTOM_BLOCK_START_Y,
                    '-'
                )
            );
        default:
            return triangles.map(
                setOffset(
                    BOTTOM_LEFT_TRIANGLES_START,
                    BOTTOM_BLOCK_START_Y,
                    '-'
                )
            );
    }
}

function setOffset(xOffset: number, yOffset: number, operator = '+') {
    return (triangle: TrianglesRow[number], index: number) => {
        const skip = index * TRIANGLE_WIDTH;
        const x =
            operator === '+'
                ? setPositive(xOffset, skip)
                : setNegative(xOffset, skip);
        const y = yOffset;
        const key = x * y;

        return {
            ...triangle,
            x,
            y,
            key,
            color: COLORS.HIGHLIGHT,
            shadowColor: 'black',
            shadowBlur: 10,
        };
    };
}

function setPositive(offset: number, skip: number) {
    return offset + skip;
}

function setNegative(offset: number, skip: number) {
    return offset - skip;
}

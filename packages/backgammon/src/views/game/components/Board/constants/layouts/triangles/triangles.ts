import { OFFSETS } from '../../../../../../../config';
import { BOTTOM_TRIANGLE, TOP_TRIANGLE } from './triangle';
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

const TRIANGLES = [
    Array(6).fill(TOP_TRIANGLE),
    Array(6).fill(TOP_TRIANGLE),
    Array(6).fill(BOTTOM_TRIANGLE),
    Array(6).fill(BOTTOM_TRIANGLE),
] as TrianglesLayout;

function setOffsets(triangles: typeof TRIANGLES[number], index: number) {
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

        return { ...triangle, x, y, key };
    };
}

function setPositive(offset: number, skip: number) {
    return offset + skip;
}

function setNegative(offset: number, skip: number) {
    return offset - skip;
}

export default TRIANGLES.map(setOffsets).flat();

import { OFFSETS } from '../../../../../../../config';
import { BOTTOM_TRIANGLE, TOP_TRIANGLE, TRIANGLE_SIZE } from './triangle';
import { TrianglesLayout, TrianglesRow } from './types';

const {
    BOTTOM_BLOCK_START_Y,
    LEFT_BLOCK_END_X,
    LEFT_BLOCK_START_X,
    RIGHT_BLOCK_END_X,
    RIGHT_BLOCK_START_X,
    TOP_BLOCK_START_Y,
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
                setOffset(LEFT_BLOCK_START_X, TOP_BLOCK_START_Y)
            );
        case 1:
            return triangles.map(
                setOffset(RIGHT_BLOCK_START_X, TOP_BLOCK_START_Y)
            );
        case 2:
            return triangles.map(
                setOffset(RIGHT_BLOCK_END_X, BOTTOM_BLOCK_START_Y, '-')
            );
        default:
            return triangles.map(
                setOffset(LEFT_BLOCK_END_X, BOTTOM_BLOCK_START_Y, '-')
            );
    }
}

function setOffset(xOffset: number, yOffset: number, operator = '+') {
    return (triangle: TrianglesRow[number], index: number) => {
        const skip = index * TRIANGLE_SIZE.width;
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

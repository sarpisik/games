export default function xOffsetCalculator(
    xOffset: number,
    i: number,
    counts: number
) {
    const _offset = xOffset + (xOffset + xOffset * i) / counts - 1 / counts;
    return _offset;
}

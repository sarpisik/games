export default function xOffsetCalculator(
    xOffset: number,
    i: number,
    counts: number
) {
    const skip = 1 / counts - (1 + 0.5 * i) / counts;

    const _offset = xOffset + skip;

    return _offset;
}

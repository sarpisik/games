import Round from '../../round';

export default function handleTriangleLayout(
    layout: Round['layout'],
    toTriangleIndex: number,
    player: Round['player'],
    shouldCapture: boolean,
    points: number
) {
    layout[toTriangleIndex] = [player, shouldCapture ? 1 : points + 1];
}

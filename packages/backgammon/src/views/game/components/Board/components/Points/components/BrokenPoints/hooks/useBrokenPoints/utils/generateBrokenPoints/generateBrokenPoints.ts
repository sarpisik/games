import { generateBrokenPointProps } from '../generateBrokenPointProps';

type Params = Omit<Parameters<typeof generateBrokenPointProps>[1], 'points'>;

export default function generateBrokenPoints(_params: Params) {
    const { round, pointPlayer } = _params;
    const points = round.brokens[pointPlayer];
    const params = Object.assign({}, _params, { points });
    const brokenPoints = Array<number>(points)
        .fill(0)
        .map((_, i) => generateBrokenPointProps(i, params));

    return brokenPoints;
}

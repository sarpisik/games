import { generateRectangle } from './utils';
import { yOffsetCalculator } from '../../../../../PlayerPoints/hooks/usePoints/utils/createPointsOnRound/utils';

interface PointsParams {
    points: number;
    y: number;
    x: number;
    baseContainer: Parameters<typeof generateRectangle>[0]['baseContainer'];
    image: Parameters<typeof generateRectangle>[0]['image'];
    width: Parameters<typeof generateRectangle>[0]['width'];
}

export default function generateCollectedPoints(params: PointsParams) {
    const { points, x, y, baseContainer, image, width } = params;

    if (typeof points === 'undefined') return [];

    return Array<number>(points)
        .fill(0)
        .map((_, i) => {
            const rectangle = generateRectangle({
                key: i,
                image,
                x,
                y: yOffsetCalculator(i, points, y),
                baseContainer,
                width,
            });

            return rectangle;
        });
}

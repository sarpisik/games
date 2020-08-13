import { generateRectangle } from './utils';

interface PointsParams {
    points: number;
    y: number;
    baseContainer: Parameters<typeof generateRectangle>[0]['baseContainer'];
    color: string;
    stroke: string;
    reverse: boolean;
    width: Parameters<typeof generateRectangle>[0]['width'];
}

export default function generateCollectedPoints(params: PointsParams) {
    const { points, y, baseContainer, color, stroke, reverse, width } = params;

    return Array<number>(points)
        .fill(0)
        .map((_, i) => {
            const rectangle = generateRectangle({
                key: i,
                color,
                y: reverse ? y + i : y - i,
                baseContainer,
                width,
            });

            // @ts-ignore
            rectangle.stroke = stroke;

            return rectangle;
        });
}

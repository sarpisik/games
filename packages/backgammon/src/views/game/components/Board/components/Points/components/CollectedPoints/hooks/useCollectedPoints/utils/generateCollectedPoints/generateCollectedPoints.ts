import { generateRectangle } from './utils';

interface PointsParams {
    points: number;
    y: number;
    baseContainer: Parameters<typeof generateRectangle>[3];
    color: string;
    stroke: string;
    reverse: boolean;
}

export default function generateCollectedPoints({
    points,
    y,
    baseContainer,
    color,
    stroke,
    reverse,
}: PointsParams) {
    return Array<number>(points)
        .fill(0)
        .map((_, i) => {
            const rectangle = generateRectangle(
                i,
                color,
                reverse ? y + i : y - i,
                baseContainer
            );

            // @ts-ignore
            rectangle.stroke = stroke;

            return rectangle;
        });
}

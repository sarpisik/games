import { Containers } from '../../../../../../../../../../../../../../app/slices/measures/measures';

interface Params {
    key: number;
    color: string;
    y: number;
    baseContainer: Containers[number];
    width: number;
}

export default function generateRectangle(params: Params) {
    const { key, color, y, baseContainer, width } = params;

    return Object.assign({}, baseContainer, {
        height: 1,
        width,
        y,
        color,
        key,
        strokeWidth: 0.5,
    });
}

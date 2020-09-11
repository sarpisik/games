import { Containers } from '../../../../../../../../../../../../../../app/slices/measures/measures';

interface Params {
    key: number;
    image: HTMLImageElement;
    y: number;
    x: number;
    baseContainer: Containers[number];
    width: number;
}

export default function generateRectangle(params: Params) {
    const { key, image, x, y, baseContainer, width } = params;

    return Object.assign({}, baseContainer, {
        height: width,
        width,
        x,
        y,
        image,
        key,
    });
}

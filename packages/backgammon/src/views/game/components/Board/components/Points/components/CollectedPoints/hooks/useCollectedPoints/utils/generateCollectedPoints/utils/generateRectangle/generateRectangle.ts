import { LAYOUTS, SIZES } from '../../../../../../../../../../constants';

export default function generateRectangle(
    key: number,
    color: string,
    y: number,
    baseContainer: typeof LAYOUTS['CONTAINERS'][number]
) {
    return Object.assign({}, baseContainer, {
        height: 1,
        width: SIZES.CONTAINER_WIDTH,
        y,
        color,
        key,
        strokeWidth: 0.5,
    });
}

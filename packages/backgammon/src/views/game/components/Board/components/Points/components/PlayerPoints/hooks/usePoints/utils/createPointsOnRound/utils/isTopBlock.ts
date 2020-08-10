import { LAYOUTS } from '../../../../../../../../../constants';

const TRIANGLES_COUNT = LAYOUTS.TRIANGLES.length;
const VERTICAL_CENTER = TRIANGLES_COUNT / 2;

export default function isTopBlock(triangleIndex: number) {
    return triangleIndex < VERTICAL_CENTER;
}

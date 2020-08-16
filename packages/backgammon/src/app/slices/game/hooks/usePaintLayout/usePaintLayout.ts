import { useDispatch } from 'react-redux';
import {
    paintAvailableTriangles,
    paintNewLayout,
    paintTriangle,
} from './thunks';

type paintNewLayoutParams = Parameters<typeof paintNewLayout>;
type paintAvailableTrianglesParams = Parameters<typeof paintAvailableTriangles>;

export default function usePaintLayout() {
    const dispatch = useDispatch();

    return {
        paintAvailableTriangles(
            triangleIndex: paintAvailableTrianglesParams[0],
            color: paintAvailableTrianglesParams[1]
        ) {
            dispatch(paintAvailableTriangles(triangleIndex, color));
        },
        paintLayout(
            triangleIndex: paintNewLayoutParams[0],
            targetX: paintNewLayoutParams[1],
            targetY: paintNewLayoutParams[2],
            color: paintNewLayoutParams[3]
        ) {
            dispatch(paintNewLayout(triangleIndex, targetX, targetY, color));
        },
        paintTriangle(
            targetX: paintNewLayoutParams[1],
            targetY: paintNewLayoutParams[2],
            color: paintNewLayoutParams[3]
        ) {
            dispatch(paintTriangle(targetX, targetY, color));
        },
    };
}

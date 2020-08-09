import { useDispatch } from 'react-redux';
import { paintNewLayout, paintTriangle } from './thunks';

type paintNewLayoutParams = Parameters<typeof paintNewLayout>;

export default function usePaintLayout() {
    const dispatch = useDispatch();

    return {
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

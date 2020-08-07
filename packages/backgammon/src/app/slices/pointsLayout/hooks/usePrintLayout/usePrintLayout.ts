import { useDispatch } from 'react-redux';
import { printNewLayout, paintTriangle } from './thunks';

type PrintNewLayoutParams = Parameters<typeof printNewLayout>;

export default function usePrintLayout() {
    const dispatch = useDispatch();

    return {
        paintLayout(
            triangleIndex: PrintNewLayoutParams[0],
            targetX: PrintNewLayoutParams[1],
            targetY: PrintNewLayoutParams[2],
            color: PrintNewLayoutParams[3]
        ) {
            dispatch(printNewLayout(triangleIndex, targetX, targetY, color));
        },
        paintTriangle(
            targetX: PrintNewLayoutParams[1],
            targetY: PrintNewLayoutParams[2],
            color: PrintNewLayoutParams[3]
        ) {
            dispatch(paintTriangle(targetX, targetY, color));
        },
    };
}

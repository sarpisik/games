import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function usePointsLayout() {
    const pointsLayout = useSelector(selector);
    const dispatch = useDispatch();

    return [pointsLayout, dispatch] as const;
}

function selector(state: RootState) {
    return state.pointsLayout.layout;
}

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useRoom() {
    const room = useSelector(selector);

    return room;
}

function selector(state: RootState) {
    return state.room;
}

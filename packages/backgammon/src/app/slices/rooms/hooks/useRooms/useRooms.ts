import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useRooms() {
    const rooms = useSelector(selector);

    return rooms;
}

function selector(state: RootState) {
    return state.rooms;
}

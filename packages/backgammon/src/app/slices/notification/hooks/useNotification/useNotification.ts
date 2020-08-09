import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useNotification() {
    const notification = useSelector(selector);

    return notification;
}

function selector(state: RootState) {
    return state.notification;
}

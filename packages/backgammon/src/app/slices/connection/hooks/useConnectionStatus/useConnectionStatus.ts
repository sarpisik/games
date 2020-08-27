import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useConnectionStatus() {
    const connectionStatus = useSelector(selector);

    return connectionStatus;
}

function selector(state: RootState) {
    return state.connection.status;
}

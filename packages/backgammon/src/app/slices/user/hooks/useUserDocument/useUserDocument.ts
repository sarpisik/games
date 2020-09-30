import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useUserDocument(): RootState['user'] {
    return useSelector(selector);
}

function selector(state: RootState) {
    return state.user;
}

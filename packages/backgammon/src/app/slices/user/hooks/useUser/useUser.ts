import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { signIn, signOut } from '../../user';

export default function useUser() {
    const dispatch = useDispatch();
    const user = useSelector(selector);

    const signInUser = (user: Parameters<typeof signIn>[0]) => {
        dispatch(signIn(user));
    };
    const signOutUser = () => {
        dispatch(signOut());
    };

    return { user, signIn: signInUser, signOut: signOutUser };
}

function selector(state: RootState) {
    return state.user;
}

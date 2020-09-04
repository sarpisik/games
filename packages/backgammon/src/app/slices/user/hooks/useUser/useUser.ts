import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { editUser, deleteUser } from '../../thunks';

export default function useUser() {
    const dispatch = useDispatch();
    const user = useSelector(selector);

    return {
        user,
        signIn() {
            // @ts-ignore
            Auth.federatedSignIn({ provider: 'Google' });
        },
        signOut() {
            Auth.signOut();
        },
        editUser(user: Parameters<typeof editUser>[0]) {
            dispatch(editUser(user));
        },
        deleteUser() {
            dispatch(deleteUser());
        },
    };
}

function selector(state: RootState) {
    return state.user;
}
